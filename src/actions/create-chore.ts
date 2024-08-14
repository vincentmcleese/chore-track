"use server";

import type { Chore, recurrenceEnum } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
// import paths from '@/paths';
import { z } from "zod";
import { auth } from "@/auth";

// const createChoreSchema = z.object({
//   title: z
//     .string()
//     .min(3)
//     .max(255)
//     .regex(/^[a-zA-Z0-9_ ]+$/, "Name must be alphanumeric"),
//   description: z
//     .string()
//     .min(10)
//     .max(255)
//     .regex(/^[a-zA-Z0-9_ ]+$/, "Description must be alphanumeric"),
//   recurrence: z
//     .string()
//     .refine((val) => val === null || val.toLowerCase() !== "", {
//       message: "Select a cadence",
//     }),
//   assignee: z.string(),
// });

// //write a function that turns the reccurence string into an interval number (weekly is 1, biweekly is 2, etc)

// function intervalFromRecurrence(recurrence: string): number {
//   switch (recurrence) {
//     case "WEEKLY":
//       return 1;
//     case "BIWEEKLY":
//       return 2;
//     case "MONTHLY":
//       return 4;
//     case "QUARTERLY":
//       return 12;
//     case "YEARLY":
//       return 52;
//     default:
//       return 1;
//   }
// }

// interface CreateChoreFormState {
//   errors: {
//     title?: string[];
//     description?: string[];
//     recurrence?: string[];
//     assignee?: string[];
//     _form?: string[];
//   };
// }

// export async function createChore(
//   formState: CreateChoreFormState,
//   formData: FormData
// ): Promise<CreateChoreFormState> {
//   // ensure inputs are valid according to createChoreSchema
//   const result = createChoreSchema.safeParse({
//     title: formData.get("title"),
//     description: formData.get("description"),
//     recurrence: formData.get("recurrence"),
//     assignee: formData.get("assignee"),
//   });

//   console.log(result);

//   if (!result.success) {
//     return {
//       errors: result.error.flatten().fieldErrors,
//     };
//   }

//   // ensure user is logged in
//   const session = await auth();
//   if (!session || !session.user) {
//     return {
//       errors: {
//         _form: ["You must be logged in to create a topic"],
//       },
//     };
//   }

//   let chore: Chore;
//   try {
//     chore = await db.chore.create({
//       data: {
//         title: result.data.title,
//         description: result.data.description,
//         creatorId: session.user.id,
//         recurrence: result.data.recurrence as recurrenceEnum,
//         interval: intervalFromRecurrence(result.data.recurrence),
//         type: "",
//         startDate: new Date(),
//         assigneeId: result.data.assignee,
//       },
//     });
//     console.log("chore created", chore);
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return {
//         errors: {
//           _form: [err.message],
//         },
//       };
//     } else {
//       return {
//         errors: {
//           _form: ["An unknown error occurred"],
//         },
//       };
//     }
//   }
//   //redirect to homepage without using paths object
//   redirect("/chores");
// }
