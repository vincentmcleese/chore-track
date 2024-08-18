"use client";
import { recurrenceEnum } from "@prisma/client";

import {
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

type Chore = {
  id: string;
  title: string;
  description: string;
  type: string;
  recurrence: recurrenceEnum;
  interval: number;
  creatorId: string;
  assigneeId: string | null;
};

type ManageTableProps = {
  chores: Chore[];
};

const ManageTable: React.FC<ManageTableProps> = ({ chores }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Chore</TableColumn>
        <TableColumn>recurrence</TableColumn>
        <TableColumn>Details</TableColumn>
      </TableHeader>
      <TableBody>
        {chores.map((chore) => (
          <TableRow key={chore.id}>
            <TableCell>{chore.title}</TableCell>
            <TableCell>{chore.recurrence}</TableCell>
            <TableCell>
              <Link href={`/manage/${chore.id}`} key={chore.id}>
                <Button> See Details </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTable;
