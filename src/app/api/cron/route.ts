import { EmailTemplate } from "@/components/email/template";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log("Received request:", {
      method: request.method,
      url: request.url,
    });

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Nimbus <nimbus@nigellestraat12.com>",
      to: "mcleesevj@gmail.com",
      subject: "Cronjob",
      react: EmailTemplate({ firstName: "Vincent" }) as React.ReactElement,
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
