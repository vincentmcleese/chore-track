"use server";

import {
  calculateDaysSinceCompletion,
  checkIfOverdue,
  sortChores,
} from "@/services/choreUtils";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  user,
  Avatar,
  Divider,
} from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";
import ChoreCard from "@/components/home/chore-card";
import VideoBackground from "@/components/home/video-background";
import { auth } from "@/auth";
import { db } from "@/db";
import * as actions from "@/actions";

export default async function Home() {
  const session = await auth();
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

  // Sort chores with overdue first (sorted by most overdue), then current (sorted by least overdue)
  const sortedChores = sortChores(chores);

  if (session?.user) {
    return (
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className={title({ color: "violet" })}>Chore Dashboard</h1> <br />
        <h3 className={subtitle()}>
          Click on a chore to log a new completion.
        </h3>
        <Divider className="my-4" />
        <div className=" flex flex-wrap items-center justify-center">
          {chores.map((chore: any) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              userAvatar={chore.assignee.image}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative">
        <VideoBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className={title({ color: "violet" })}>Chore Tracker</h1>
        </div>
      </div>
    );
  }
}
