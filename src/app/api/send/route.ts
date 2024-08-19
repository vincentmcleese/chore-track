import { EmailTemplate } from "@/components/email/template";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body to extract email and chore
    const { email, chore } = await request.json();

    // Send the email using the extracted parameters
    const { data, error } = await resend.emails.send({
      from: "Nimbus <nimbus@chore-track.com>",
      to: "mcleesevj@gmail.com",
      subject: "Chore Notification",
      react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
