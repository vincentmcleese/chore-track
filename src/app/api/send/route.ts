import { CompletionTemplate } from "@/components/email/completion-template";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body to extract email status and title
    const { email, status, title } = await request.json();

    // Send the email using the extracted parameters
    const { data, error } = await resend.emails.send({
      from: "Nimbus <nimbus@nigellestraat12.com>",
      to: email,
      subject: `${title} is marked done!`,
      react: CompletionTemplate({
        status,
        title,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Error sending email:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("Error in POST request:", error);
    return Response.json({ error }, { status: 500 });
  }
}
