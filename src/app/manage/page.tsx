import { title, subtitle } from "@/components/primitives";
import { db } from "@/db";
import ManageTable from "@/components/manage/manage-table";

export default async function Manage() {
  const chores = await db.chore.findMany();
  console.log(chores);

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="place-content-center">
        <h1 className={title({ color: "violet" })}>Manage</h1> <br />
        <h3 className={subtitle()}>Overview of chores. Click to edit. </h3>
      </div>
      <div className="">
        <ManageTable chores={chores} />
      </div>
    </div>
  );
}
