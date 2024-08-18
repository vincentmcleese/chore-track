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
  } catch (error) {
    console.error("error creating completion", error);
    return {
      errors: {
        _form: ["Error creating completion"],
      },
    };
  }
}
