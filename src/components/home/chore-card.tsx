"use client";

import React from "react";
import * as actions from "@/actions";
import confetti from "canvas-confetti";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    daysSinceCompletion?: number;
    status?: string;
  };
  userAvatar?: string;
}

const returnColor = (status?: string) => {
  if (status === "overdue") {
    return "danger";
  } else {
    return "success";
  }
};

export default function ChoreCard({ chore, userAvatar }: ChoreCardProps) {
  const handleConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 160,
    });
  };

  const handlePress =
    (choreId: string, choreTitle: string, choreStatus?: string) =>
    (e: React.MouseEvent) => {
      e.preventDefault();
      console.log(`Chore ID: ${choreId}`);
      try {
        actions.createCompletion(choreId, choreTitle, choreStatus ?? "");
        console.log("Chore completed");
        toast.success(`Chore marked complete!`);
        handleConfetti();
      } catch (error) {
        console.error("Error completing chore:", error);
        toast.error(`Failed to complete chore ${choreId}.`);
      }
    };

  //return danger for overdue and success for current
  const returnColor = (status: string = "") => {
    if (status === "overdue") {
      return "danger";
    } else {
      return "success";
    }
  };

  return (
    <div
      className="p-2"
      style={{ cursor: "pointer" }}
      key={chore.id}
      onClick={handlePress(chore.id, chore.title, chore.status)}
    >
      <Card
        isFooterBlurred
        isHoverable={true}
        key={chore.id}
        className="max-w-[400px]"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <small className="text-default-500">{`Every ${chore.interval} week(s)`}</small>
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
          <Chip color={returnColor(chore.status)}>
            {chore.daysSinceCompletion === 0
              ? "Recently completed"
              : `last completed ${chore.daysSinceCompletion} days ago`}
          </Chip>
          <Avatar src={userAvatar} />
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}
