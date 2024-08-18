import { title, subtitle } from "@/components/primitives";
import { db } from "@/db";
import ManageTable from "@/components/manage/manage-table";
import { type NextRequest } from "next/server";
import CompletionTable from "@/components/manage/completion-table";

export default async function ChorePage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the chore with the given id and include completions
  const chore = await db.chore.findUnique({
    where: { id: params.id },
    include: {
      completions: {
        orderBy: { completedAt: "desc" },
      },
    },
  });

  return (
    <div>
      Chore Id: {params.id}
      <CompletionTable completions={chore?.completions} />
    </div>
  );
}
