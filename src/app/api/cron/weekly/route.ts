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
  try {
    console.log("Received request:", {
      method: request.method,
    });

    // Fetch chores from the request or database
    const chores = await fetchChores();

    // Sort chores with overdue first (sorted by most overdue), then current (sorted by least overdue)
    const sortedChores = sortChores(chores);

    // Define the recipients
    const recipients = ["mcleesevj@gmail.com", "aomcleese@gmail.com"];

    // Send the email to each recipient
    for (const recipient of recipients) {
      try {
        const { data, error } = await resend.emails.send({
          from: "Dr. Stoffels <stoffels@nigellestraat12.com>",
          to: recipient,
          subject: `Weekly chore roundup`,
          react: WeeklyTemplate({ chores: sortedChores }) as React.ReactElement,
        });

        if (error) {
          console.error(`Error sending email to ${recipient}:`, error);
          return new Response(JSON.stringify({ error }), { status: 500 });
        }
      } catch (error) {
        console.error(`Error sending email to ${recipient}:`, error);
        return new Response(JSON.stringify({ error }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ data: "Emails sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

async function fetchChores() {
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

  // Add "days since last completion" to each chore
  chores.forEach((chore: any) => {
    chore.daysSinceCompletion = calculateDaysSinceCompletion(chore.completions);
  });

  // Check if days since last completion is greater than interval and add a status attribute
  chores.forEach((chore: any) => {
    chore.status = checkIfOverdue(chore.daysSinceCompletion, chore.interval);
  });

  return chores;
}
