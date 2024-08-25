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

  //calculate days until next duedate for each chore, return it as an integer
  chores.forEach((chore: any) => {
    const currentDate = new Date();
    const nextDueDate = new Date(
      chore.completions[0].completedAt.getTime() +
        chore.interval * 7 * 24 * 60 * 60 * 1000
    );
    const differenceInMilliseconds =
      nextDueDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (24 * 60 * 60 * 1000)
    );
    chore.nextDue = differenceInDays;
  });

  // Sort chores with overdue first (sorted by most overdue), then current (sorted by least overdue)
  const sortedChores = sortChores(chores);

  //filter chores with assignee email equal to mcleesevj@gmail.com
  const vincentChores = sortedChores.filter(
    (chore) => chore.assignee && chore.assignee.email === "mcleesevj@gmail.com"
  );

  //filter chores with assignee email equal to aomcleese@gmail.com
  const andyChores = sortedChores.filter(
    (chore) => chore.assignee && chore.assignee.email === "aomcleese@gmail.com"
  );

  try {
    console.log("Received request:", {
      method: request.method,
      url: request.url,
    });

    // Define the props for the first email
    const firstEmailProps = {
      from: "Dr. Stoffels <stoffels@nigellestraat12.com>",
      to: "mcleesevj@gmail.com",
      subject: `Vincent's upcoming chores`,
      react: ReminderTemplate({
        chores: vincentChores,
        name: "Vincent",
      }) as React.ReactElement,
    };

    // Define the props for the second email
    const secondEmailProps = {
      from: "Dr. Stoffels <stoffels@nigellestraat12.com>",
      to: "anotheremail@example.com",
      subject: `Andy's upcoming chores`,
      react: ReminderTemplate({
        chores: andyChores,
        name: "Andy",
      }) as React.ReactElement,
    };

    // Send the first email
    const { data: data1, error: error1 } = await resend.emails.send(
      firstEmailProps
    );

    if (error1) {
      console.error("Error sending first email:", error1);
      return Response.json({ error: error1 }, { status: 500 });
    }

    // Send the second email
    const { data: data2, error: error2 } = await resend.emails.send(
      secondEmailProps
    );

    if (error2) {
      console.error("Error sending second email:", error2);
      return Response.json({ error: error2 }, { status: 500 });
    }

    return Response.json({ data: [data1, data2] });
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json({ error }, { status: 500 });
  }
}
