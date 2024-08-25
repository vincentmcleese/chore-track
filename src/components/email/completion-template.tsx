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

interface CompletionTemplateProps {
  status: string;
  title: string;
  firstName: string;
}

export const CompletionTemplate: React.FC<
  Readonly<CompletionTemplateProps>
> = ({ status, firstName, title }) => (
  <Html>
    <Head />
    <Preview>Well done!</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src="http://drive.google.com/uc?export=view&id=1guy7YENhLXB1O72tDdQlDuQtPEmwItIS"
              width="64"
              height="64"
              alt="Vercel"
              className="my-0 mx-auto rounded-full"
            />
          </Section>
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            An update from Nimbus
          </Heading>
          <Text className="text-black text-[14px] leading-[24px]">
            Great work, {firstName}. <b>{title}</b> is marked complete.It was
            completed with a status of:{" "}
          </Text>
          <Text
            className={`${
              status === "overdue" ? "text-red-600" : "text-green-600"
            } text-[14px] leading-[24px]`}
          >
            {status}
          </Text>

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
            This is an automated email sent everytime a chore is completed. If
            you would like to unsubscribe, too bad. You&#39;re stuck with me.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
  // <div>
  //   <h1>Well done!</h1>
  //   <p>
  //     {title} is marked complete.
  //     <br />
  //     It was completed with a status of: {status}.
  //   </p>
  //   <Img
  //     src="http://drive.google.com/uc?export=view&id=1guy7YENhLXB1O72tDdQlDuQtPEmwItIS"
  //     alt="nimbus"
  //     width="100"
  //     height="100"
  //     style={{ borderRadius: "50%" }}
  //   />
  //   <p style={{ fontWeight: "bold", fontSize: "1.2em", marginTop: "20px" }}>
  //     Love, Nimbus.
  //   </p>
  //   ;
  // </div>
);
