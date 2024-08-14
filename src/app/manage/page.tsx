"use client";

import {
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";

export default function Manage() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="place-content-center">
        <h1 className={title({ color: "violet" })}>Manage</h1> <br />
        <h3 className={subtitle()}>Overview of chores. Click to edit. </h3>
      </div>
      <div className="">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Chore</TableColumn>
            <TableColumn>Cadence</TableColumn>
            <TableColumn>Owner</TableColumn>
            <TableColumn>Owner</TableColumn>
            <TableColumn>Owner</TableColumn>
            <TableColumn>Owner</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="">
              <TableCell>example</TableCell>
              <TableCell>example</TableCell>
              <TableCell>example</TableCell>
              <TableCell>example</TableCell>
              <TableCell>example</TableCell>
              <TableCell>example</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
