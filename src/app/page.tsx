"use server";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  user,
  Avatar,
} from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";
import ChoreCard from "@/components/home/chore-card";
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
    },
  });

  //add "days since last completion" to each chore
  chores.forEach((chore: any) => {
    if (chore.completions.length > 0) {
      const lastCompletion = chore.completions[0];
      const daysSinceCompletion = Math.floor(
        (Date.now() - lastCompletion.completedAt.getTime()) / 86400000
      );
      chore.daysSinceCompletion = daysSinceCompletion;
    } else {
      chore.daysSinceCompletion = null;
    }
  });

  //check if days since last completion is greater than interval (weeks, so change that to days). add a status attribute to chore and set it to "overdue" if true if true.
  chores.forEach((chore: any) => {
    if (
      chore.daysSinceCompletion &&
      chore.daysSinceCompletion > chore.interval * 7
    ) {
      chore.status = "overdue";
    } else {
      chore.status = "current";
    }
  });

  //sort chores with overdue first (sorted by most overdue), then current (sorted by least overdue)
  chores.sort((a: any, b: any) => {
    if (a.status === "overdue" && b.status === "current") {
      return -1;
    } else if (a.status === "current" && b.status === "overdue") {
      return 1;
    } else {
      return a.daysSinceCompletion - b.daysSinceCompletion;
    }
  });

  if (session?.user) {
    return (
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className={title({ color: "violet" })}>Chore Dashboard</h1> <br />
        <h3 className={subtitle()}>
          Click on a chore to log a new completion.
        </h3>
        <div className=" flex flex-wrap items-center justify-center">
          {chores.map((chore: any) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              userAvatar={session.user?.image ?? ""}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative">
        <video
          src="./background.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none"></div>{" "}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className={title({ color: "violet" })}>Chore Tracker</h1>
        </div>
      </div>
    );
  }
}
