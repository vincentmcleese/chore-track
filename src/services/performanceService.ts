"use server";

import { db } from "@/db";

interface UserPerformance {
  name: string;
  onTime: number;
  overdue: number;
}

export async function fetchUserPerformance(): Promise<UserPerformance[]> {
  try {
    console.log("Fetching completions...");
    const completions = await db.choreCompletion.findMany({
      include: {
        user: true,
      },
    });
    console.log("Completions fetched:", completions);

    const userPerformance: Record<string, UserPerformance> = {};

    completions.forEach((completion) => {
      const userId = completion.userId;
      if (!userPerformance[userId]) {
        userPerformance[userId] = {
          name: completion.user.name || "Unknown",
          onTime: 0,
          overdue: 0,
        };
      }
      completion.statusAtCompletion === "on-time"
        ? userPerformance[userId].onTime++
        : userPerformance[userId].overdue++;
    });
    console.log(
      "Transformed user performance:",
      Object.values(userPerformance)
    );
    return Object.values(userPerformance);
  } catch (error) {
    console.error("Error fetching user performance:", error);
    throw error;
  }
}
