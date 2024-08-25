import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

// Define the interface for a single chore
// Define the interface for a single chore
interface Chore {
  id: string;
  title: string;
  daysSinceCompletion: number | null;
  nextDue: number | null;
  status: string;
  assignee: {
    name: string;
    image: string;
  };
  completions: {
    completedAt: Date;
  }[];
}

// Define the interface for the props of the WeeklyTemplate component
interface ReminderTemplateProps {
  chores: Chore[];
  name: string;
}

export const ReminderTemplate: React.FC<Readonly<ReminderTemplateProps>> = ({
  chores,
  name,
}) => {
  //filter chores array for chores with status of overdue
  const overdueChores = chores.filter((chore) => chore.status === "overdue");

  //filter chores array for chores with nextdue less than 8, but not negative
  const dueSoonChores = chores.filter(
    (chore) => chore.nextDue && (chore.nextDue < 8 || chore.nextDue < 0)
  );

  return (
    <Html>
      <Head />
      <Preview>{name}, Your upcoming chores</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="http://drive.google.com/uc?export=view&id=1YdxGYSo3yLG4nClW0BjP1jrQ1iXn1XBx"
                width="64"
                height="64"
                alt="Vercel"
                className="my-0 mx-auto rounded-full"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              The Dr. Stoffel&#39;s Pre-weekend reminder
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Happy Friday! While i&#39;m munching on some andijvie, it looks
              like you&#39;re going to be busy because you have{" "}
              {dueSoonChores.length} chores to do in the next 7 days.
              {overdueChores.length > 0 && (
                <>
                  {" "}
                  You also have {overdueChores.length} overdue chores. Maybe
                  start with those?
                </>
              )}
            </Text>
            <Hr className="m-[16px] border-t-2 border-[#cccccc]" />

            {overdueChores.length > 0 && (
              <Section>
                <Heading className=" text-[20px] font-normal text-center p-0 my-[20px] mx-0">
                  Overdue Chores
                </Heading>
                {overdueChores.map((chore) => (
                  <>
                    <Row key={chore.id}>
                      <Column align="left">
                        <Text className="text-black text-[14px] leading-[24px]">
                          {chore.title}
                        </Text>
                      </Column>
                      <Column align="right">
                        <Text className="text-red-600 text-[14px] leading-[24px]">
                          Overdue by {Math.abs(chore.nextDue ?? 0)} days
                        </Text>
                      </Column>
                    </Row>
                    <Hr className="m-[16px] border-[#cccccc]" />
                  </>
                ))}
              </Section>
            )}

            <Section>
              <Heading className=" text-[20px] font-normal text-center p-0 my-[20px] mx-0">
                Upcoming Chores
              </Heading>
              {dueSoonChores.map((chore) => (
                <>
                  <Row key={chore.id}>
                    <Column align="left">
                      <Text className="text-black text-[14px] leading-[24px]">
                        {chore.title}
                      </Text>
                    </Column>

                    <Column align="right">
                      <Text>{chore.nextDue ?? "n.a"} day&#39;s</Text>
                    </Column>
                  </Row>
                  <Hr className="m-[16px] border-[#cccccc]" />
                </>
              ))}
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://nigellestraat12.com/"
              >
                Go to the app
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link
                href="https://nigellestraat12.com/"
                className="text-blue-600 no-underline"
              >
                https://nigellestraat12.com/
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This weekly roundup is sent every monday morning. If you would
              like to unsubscribe, too bad. You&#39;re stuck with me.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
