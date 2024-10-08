"use server";

import type { ChoreCompletion } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { cn } from "tailwind-variants";
import { auth } from "@/auth";

export async function createCompletion(
  choreId: string,
  choreTitle: string,
  choreStatus: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  let completion: ChoreCompletion;
  try {
    completion = await db.choreCompletion.create({
      data: {
        userId: userId || "",
        choreId: choreId,
        statusAtCompletion: choreStatus,
        completedAt: new Date(),
      },
    });
    console.log("completion created", completion);
    // send email by calling the send email function from the api with json body of email and chore
    const response = await fetch("https://nigellestraat12.com/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
        name: session?.user?.name,
        status: choreStatus,
        title: choreTitle,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send email", response.statusText);
      return;
    }
  } catch (error) {
    console.error("error creating completion", error);
    return {
      errors: {
        _form: ["Error creating completion"],
      },
    };
  }
}
