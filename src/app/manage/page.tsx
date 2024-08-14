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

export default async function Manage() {
  return (
    <div>
      <h1>This is the manage page!</h1>
      <br />
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
