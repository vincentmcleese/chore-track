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
  const chores = await db.chore.findMany();
  const ChoreCompletion = await db.choreCompletion.findMany();

  if (session?.user) {
    return (
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className={title({ color: "violet" })}>Chore-track</h1> <br />
        <h3 className={subtitle()}>Keep Nigellestraat 12 clean and tidy. </h3>
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
      <div>
        <h1>Login to begin</h1>
      </div>
    );
  }
}
