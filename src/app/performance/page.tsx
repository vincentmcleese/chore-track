"use client";

import { title, subtitle } from "@/components/primitives";
import { Divider } from "@nextui-org/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { name: "User A", onTime: 90, overdue: 10 },
  { name: "User B", onTime: 70, overdue: 30 },
];

export default function Add() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="place-content-center">
        <h1 className={title({ color: "violet" })}>Performance</h1> <br />
        <h3 className={subtitle()}>This feature is coming soon. </h3>
        <Divider className="my-4" />
      </div>
      <div className="flex justify-center">
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="onTime" stackId="a" fill="#8884d8" />
          <Bar dataKey="overdue" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}
