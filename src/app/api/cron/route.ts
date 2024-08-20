import { WeeklyTemplate } from "@/components/email/weekly-template";
import { Resend } from "resend";
import * as React from "react";
import { db } from "@/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // Get an array of all the completions in the last 7 days
  const completions = await db.choreCompletion.findMany({
    where: {
      completedAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      chore: {
        select: {
          title: true,
        },
      },
    },
  });

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
      react: WeeklyTemplate({ completions: completions }) as React.ReactElement,
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
