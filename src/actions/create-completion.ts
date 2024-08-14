"use server";

import type { ChoreCompletion } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/src/db";
import { cn } from "tailwind-variants";


export async function createCompletion(userId: any, formData: any) {
  console.log(userId);
  const choreId = formData.get("choreId");
  console.log(choreId);
  console.log("Ok here we go");

  let completion: ChoreCompletion;
  try {
    completion = await db.choreCompletion.create({
      data: {
        userId: userId,
        choreId: choreId,
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
