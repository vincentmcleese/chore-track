"use client";

import {
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

// Define the User type
type User = {
  name: string | null;
  image: string | null;
};

// Define the Completion type
type Completion = {
  id: string;
  choreId: string;
  userId: string;
  statusAtCompletion: string | null;
  completedAt: Date;
  user: User;
};

// Define the props for CompletionTable
type CompletionTableProps = {
  completions: Completion[] | null;
};

const returnColor = (status?: string) => {
  if (status === "overdue") {
    return "danger";
  } else {
    return "success";
  }
};

// Update the CompletionTable component to use the new props
const CompletionTable: React.FC<CompletionTableProps> = ({ completions }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>User</TableColumn>
        <TableColumn>Chore</TableColumn>
        <TableColumn>Completed At</TableColumn>
      </TableHeader>
      <TableBody>
        {completions
          ? completions.map((completion) => (
              <TableRow key={completion.id}>
                <TableCell>{completion.user.name}</TableCell>
                <TableCell suppressHydrationWarning>
                  {new Date(completion.completedAt).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    color={returnColor(
                      completion.statusAtCompletion ?? undefined
                    )}
                  >
                    {completion.statusAtCompletion}
                  </Chip>
                </TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
};

export default CompletionTable;
