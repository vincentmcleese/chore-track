import {
  calculateDaysSinceCompletion,
  checkIfOverdue,
  sortChores,
} from "@/services/choreUtils";
import { WeeklyTemplate } from "@/components/email/weekly-template";
import { Resend } from "resend";
import * as React from "react";
import { db } from "@/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  //chores
  const chores = await db.chore.findMany({
    include: {
      completions: {
        orderBy: { completedAt: "desc" },
        take: 1,
      },
      assignee: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  // count how many completions were done in the last 7 days from the database

  // const completions = await db.completion.findMany({
  //   where: {
  //     completedAt: {
  //       gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  //     },
  //   },

  // Add "days since last completion" to each chore
  chores.forEach((chore: any) => {
    chore.daysSinceCompletion = calculateDaysSinceCompletion(chore.completions);
  });

  // Check if days since last completion is greater than interval and add a status attribute
  chores.forEach((chore: any) => {
    chore.status = checkIfOverdue(chore.daysSinceCompletion, chore.interval);
  });

  // Sort chores with overdue first (sorted by most overdue), then current (sorted by least overdue)
  const sortedChores = sortChores(chores);

  try {
    console.log("Received request:", {
      method: request.method,
      url: request.url,
    });

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Dr. Stoffels <stoffels@nigellestraat12.com>",
      to: "mcleesevj@gmail.com",
      subject: `Weekly chore roundup`,
      react: WeeklyTemplate({ chores: sortedChores }) as React.ReactElement,
    });

    if (error) {
      console.error("Error sending email:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("Error in GET request:", error);
    return Response.json({ error }, { status: 500 });
  }
}
