"use server";

const chores = require("@/db/chores.json");
const db = require("@/db");
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";

export default async function Home() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <h1 className={title({ color: "violet" })}>Chore-track</h1> <br />
      <h3 className={subtitle()}>Keep Nigellestraat 12 clean and tidy. </h3>
      <div className=" flex flex-wrap items-center justify-center">
        {chores.map((chore: any) => (
          <div className="p-2" key={chore.key}>
            <Card className="max-w-[400px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{chore.owner}</p>
                <small className="text-default-500">{chore.cadence}</small>
                <h4 className="font-bold text-large">{chore.title}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
