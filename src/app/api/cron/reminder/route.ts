import {
  calculateDaysSinceCompletion,
  checkIfOverdue,
  sortChores,
} from "@/services/choreUtils";
import { WeeklyTemplate } from "@/components/email/weekly-template";
import { Resend } from "resend";
import * as React from "react";
import { db } from "@/db";
import { ReminderTemplate } from "@/components/email/reminder-template";

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
          email: true,
        },
      },
    },
  });

  // Add "days since last completion" to each chore
  chores.forEach((chore: any) => {
    chore.daysSinceCompletion = calculateDaysSinceCompletion(chore.completions);
  });

  // Check if days since last completion is greater than interval and add a status attribute
  chores.forEach((chore: any) => {
    chore.status = checkIfOverdue(chore.daysSinceCompletion, chore.interval);
  });

  // Add a next due date to each chore
  chores.forEach((chore: any) => {
    if (chore.completions && chore.completions.length > 0) {
      chore.nextDueDate = new Date(
        chore.completions[0].completedAt.getTime() +
          chore.interval * 7 * 24 * 60 * 60 * 1000
      );
    } else {
      chore.nextDueDate = null;
    }
  });

  //filter chores with assignee email equal to mcleesevj@gmail.com
  const userChores = chores.filter(
    (chore) => chore.assignee && chore.assignee.email === "mcleesevj@gmail.com"
  );

  // Sort chores with overdue first (sorted by most overdue), then current (sorted by least overdue)
  const sortedChores = sortChores(userChores);

  try {
    console.log("Received request:", {
      method: request.method,
      url: request.url,
    });

    // Send the email with updated chores
    const { data, error } = await resend.emails.send({
      from: "Dr. Stoffels <stoffels@nigellestraat12.com>",
      to: "mcleesevj@gmail.com",
      subject: `Your upcoming chores`,
      react: ReminderTemplate({
        chores: sortedChores,
        name: "Vincent",
      }) as React.ReactElement,
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
