"use server";

import {
  calculateDaysSinceCompletion,
  checkIfOverdue,
  sortChores,
} from "@/services/choreUtils";

import { auth } from "@/auth";
import { db } from "@/db";

import ChoreDashboard from "@/components/home/ChoreDashboard";

export default async function Home() {
  const session = await auth();
  const userEmail = session?.user?.email;

  //get a list of chores and include the last chorecompletion for each chore
  const chores = await db.chore.findMany({
    include: {
      completions: {
        orderBy: { completedAt: "desc" },
        take: 1,
      },
      assignee: {
        select: {
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });

  // Add "days since last completion" to each chore
  chores.forEach((chore: any) => {
    chore.daysSinceCompletion = calculateDaysSinceCompletion(chore.completions);
  });

  // Check if days since last completion is greater than interval and add a status attribute
  chores.forEach((chore: any) => {
    chore.status = checkIfOverdue(chore.daysSinceCompletion, chore.interval);
  });

  //calculate number of days until the next duedate for this chore
  chores.forEach((chore: any) => {
    // Convert interval from weeks to days
    const intervalInDays = chore.interval * 7;
    chore.daysUntilDue = intervalInDays - chore.daysSinceCompletion;
  });

  // Sort chores with overdue first (sorted by most overdue), then current (sorted by least overdue)
  const sortedChores = sortChores(chores);

  // Filter chores based on the current user
  const userChores = sortedChores.filter(
    (chore) => chore.assignee.email === userEmail
  );

  return (
    <ChoreDashboard
      chores={sortedChores}
      userChores={userChores}
      session={session}
    />
  );
}
