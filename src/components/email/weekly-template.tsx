interface WeeklyTemplateProps {
  completions: {
    id: string;
    choreId: string;
    userId: string;
    completedAt: Date;
    statusAtCompletion: string | null;
  }[];
}

export const WeeklyTemplate: React.FC<Readonly<WeeklyTemplateProps>> = ({
  completions,
}) => (
  <div>
    <h1>This week {completions.length} were completed!</h1>

    {completions.map((completion) => (
      <div key={completion.id}>
        <h2>Chore ID: {completion.choreId}</h2>
        <p>Completed by: {completion.userId}</p>
        <p>Completed at: {completion.completedAt.toDateString()}</p>
        <p>Status at completion: {completion.statusAtCompletion}</p>
      </div>
    ))}
  </div>
);
