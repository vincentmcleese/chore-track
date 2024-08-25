import { Img } from "@react-email/components";
import { Button, Html, Head, Container } from "@react-email/components";

// Define the interface for a single chore
interface Chore {
  id: string;
  title: string;
  daysSinceCompletion: number | null;
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
interface WeeklyTemplateProps {
  chores: Chore[];
}

export const WeeklyTemplate: React.FC<Readonly<WeeklyTemplateProps>> = ({
  chores,
}) => (
  <Html>
    <Head>
      <title>My email title</title>
    </Head>
    <Container>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Container>
  </Html>
);

{
  /* <div>
      <h1>Here is the weekly roundup!</h1>
      <p>Here is the week in review:</p>
      {chores.map((chore) => (
        <div key={chore.id}>
          <p>Chore: {chore.title}</p>
          <p>Status: {chore.status}</p>
          <p>Completed at: {chore.completions[0].completedAt.toDateString()}</p>
          <p>Owner: {chore.assignee.name}</p>
        </div>
      ))}
      <Img
        src="http://drive.google.com/uc?export=view&id=1YdxGYSo3yLG4nClW0BjP1jrQ1iXn1XBx"
        alt="nimbus"
        width="100"
        height="100"
        style={{ borderRadius: "50%" }}
      />
      <p style={{ fontWeight: "bold", fontSize: "1.2em", marginTop: "20px" }}>
        Love, Dr. Stoffels.
      </p>
    </div> */
}
