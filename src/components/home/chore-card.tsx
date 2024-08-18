"use client";

import * as actions from "@/actions";
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

interface ChoreCardProps {
  chore: {
    id: string;
    title: string;
    description: string;
    type: string;
    recurrence: string;
    interval: number;
    creatorId: string;
    assigneeId: string;
  };
  userAvatar?: string;
}

export default function ChoreCard({ chore, userAvatar }: ChoreCardProps) {
  // Define the press event handler
  const handlePress = (choreId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    actions.createCompletion(choreId, FormData);
  };

  return (
    <div className="p-2" key={chore.id} onClick={handlePress(chore.id)}>
      <Card isPressable isFooterBlurred className="max-w-[400px]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{chore.assigneeId}</p>
          <small className="text-default-500">{chore.interval}</small>
          <h4 className="font-bold text-large">{chore.title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={`/img/${chore.id}.png`}
            width={270}
          />
        </CardBody>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p> Performance</p>
          <Avatar src={userAvatar} />
        </CardFooter>
      </Card>
    </div>
  );
}
