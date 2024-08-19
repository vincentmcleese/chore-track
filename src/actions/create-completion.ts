"use server";

import type { ChoreCompletion } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { cn } from "tailwind-variants";
import { auth } from "@/auth";

export async function createCompletion(choreId: string, choreStatus: string) {
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
    const response = await fetch("http://localhost:3000/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
        chore: choreStatus,
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
