"use client";

import React, { useState } from "react";
import { Switch, Divider } from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";
import ChoreCard from "@/components/home/chore-card";
import VideoBackground from "@/components/home/video-background";

const ChoreDashboard = ({
  chores,
  userChores,
  session,
}: {
  chores: any[];
  userChores: any[];
  session: any;
}) => {
  const [showOnlyMyChores, setShowOnlyMyChores] = useState(true);

  const toggleFilter = () => {
    setShowOnlyMyChores(!showOnlyMyChores);
  };

  const displayedChores = showOnlyMyChores ? userChores : chores;

  if (session?.user) {
    return (
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
        <h1 className={title({ color: "violet" })}>Chore Dashboard</h1> <br />
        <h3 className={subtitle()}>
          Click on a chore to log a new completion.
        </h3>
        <Divider className="my-4" />
        <Switch defaultSelected color="secondary" onClick={toggleFilter}>
          Show only my chores
        </Switch>
        {/* <Button
          onClick={toggleFilter}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showOnlyMyChores ? "Show All Chores" : "Show My Chores"}
        </Button> */}
        <div className="flex flex-wrap items-center justify-center">
          {displayedChores.map((chore: any) => (
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
      </div>
    );
  }
};

export default ChoreDashboard;
