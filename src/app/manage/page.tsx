import { title, subtitle } from "@/components/primitives";
import { db } from "@/db";
import ManageTable from "@/components/manage/manage-table";
import { Divider } from "@nextui-org/react";

export default async function Manage() {
  const chores = await db.chore.findMany();

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="place-content-center">
        <h1 className={title({ color: "violet" })}>Manage</h1> <br />
        <h3 className={subtitle()}>Overview of chores. Click to edit. </h3>
        <Divider className="my-4" />
      </div>
      <div className="">
        <ManageTable chores={chores} />
      </div>
    </div>
  );
}
