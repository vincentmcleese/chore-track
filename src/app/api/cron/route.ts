import { EmailTemplate } from "@/components/email/template";
import { Resend } from "resend";
import * as React from "react";
import { db } from "@/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // Get the title of max one chore in the database
  const chore = await db.chore.findFirst({
    select: {
      title: true,
    },
  });

  try {
    console.log("Received request:", {
      method: request.method,
      url: request.url,
    });

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Nimbus <nimbus@nigellestraat12.com>",
      to: "mcleesevj@gmail.com",
      subject: `Cronjob for ${chore?.title}`,
      react: EmailTemplate({ firstName: "Vincent" }) as React.ReactElement,
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
