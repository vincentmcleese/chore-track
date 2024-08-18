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

interface CompletionTableProps {
  completions:
    | {
        id: string;
        choreId: string;
        userId: string;
        completedAt: Date;
      }[]
    | undefined;
}

const CompletionTable: React.FC<CompletionTableProps> = ({ completions }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Chore ID</TableColumn>
        <TableColumn>User ID</TableColumn>
        <TableColumn>Completed At</TableColumn>
      </TableHeader>
      <TableBody>
        {completions?.map((completion) => (
          <TableRow key={completion.id}>
            <TableCell>{completion.id}</TableCell>
            <TableCell>{completion.choreId}</TableCell>
            <TableCell>{completion.userId}</TableCell>
            <TableCell>{completion.completedAt.toString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompletionTable;
