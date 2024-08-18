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

interface ManageTableProps {
  chores: Array<{
    id: string;
    title: string;
    description: string;
    type: string;
    recurrence: string;
    interval: number;
    creatorId: string;
    assigneeId: string;
  }>;
}

const ManageTable: React.FC<ManageTableProps> = ({ chores }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Description</TableColumn>
      </TableHeader>
      <TableBody>
        {chores.map((chore) => (
          <TableRow key={chore.id}>
            <TableCell>{chore.id}</TableCell>
            <TableCell>{chore.title}</TableCell>
            <TableCell>{chore.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageTable;
