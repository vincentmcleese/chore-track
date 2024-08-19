import { title, subtitle } from "@/components/primitives";
import { Divider } from "@nextui-org/react";

export default async function Add() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="place-content-center">
        <h1 className={title({ color: "violet" })}>Performance</h1> <br />
        <h3 className={subtitle()}>This feature is coming soon. </h3>
        <Divider className="my-4" />
      </div>
    </div>
  );
}
