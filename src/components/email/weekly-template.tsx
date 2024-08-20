import { Img } from "@react-email/components";

interface WeeklyTemplateProps {
  completions: ({
    chore: {
      title: string;
    };
    user: {
      name: string | null;
    };
  } & {
    id: string;
    choreId: string;
    userId: string;
    completedAt: Date;
    statusAtCompletion: string | null;
  })[];
}

export const WeeklyTemplate: React.FC<Readonly<WeeklyTemplateProps>> = ({
  completions,
}) => (
  <div>
    <h1>This week {completions.length} were completed!</h1>
    <p>Here is the week in review:</p>
    {completions.map((completion) => (
      <div key={completion.id}>
        <p>Chore: {completion.chore.title}</p>
        <p>Completed by: {completion.user.name}</p>
        <p>Completed at: {completion.completedAt.toDateString()}</p>
        <p>Status at completion: {completion.statusAtCompletion}</p>
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
  </div>
);
