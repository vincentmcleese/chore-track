import { title, subtitle } from "@/components/primitives";
import { db } from "@/db";
import CompletionTable from "@/components/manage/completion-table";

export default async function ChorePage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the chore with the given id and include completions and include the user details for completions userid
  const chore = await db.chore.findUnique({
    where: { id: params.id },
    select: {
      title: true,
      description: true,
      completions: {
        select: {
          id: true,
          choreId: true,
          userId: true,
          completedAt: true,
          statusAtCompletion: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <h1 className={title({ color: "violet" })}>{chore?.title}</h1> <br />
      <h3 className={subtitle()}>{chore?.description}</h3> <br />
      <CompletionTable completions={chore?.completions ?? null} />
    </div>
  );
}
