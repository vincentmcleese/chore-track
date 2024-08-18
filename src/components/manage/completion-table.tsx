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

// Define the User type
type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
};

// Define the Completion type
type Completion = {
  id: string;
  choreId: string;
  userId: string;
  statusAtCompletion: string;
  completedAt: Date;
  user: User;
};

// Define the props for CompletionTable
type CompletionTableProps = {
  completions: Completion[];
};

// Update the CompletionTable component to use the new props
const CompletionTable: React.FC<CompletionTableProps> = ({ completions }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Completed by</TableColumn>
        <TableColumn>Completed At</TableColumn>
        <TableColumn>Status at completion</TableColumn>
      </TableHeader>
      <TableBody>
        {completions.map((completion) => (
          <TableRow key={completion.id}>
            <TableCell>{completion.user.name}</TableCell>
            <TableCell suppressHydrationWarning>
              {completion.completedAt.toLocaleDateString()}
            </TableCell>
            <TableCell>{completion.statusAtCompletion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompletionTable;
