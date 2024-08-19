interface CompletionTemplateProps {
  status: string;
  title: string;
}

export const CompletionTemplate: React.FC<
  Readonly<CompletionTemplateProps>
> = ({ status, title }) => (
  <div>
    <h1>Well done!</h1>
    <p>
      {title} is marked complete. It was completed with a status of: {status}.
      Love, Nimbus.
    </p>
    <img
      src="https://nigellestraat12.com/img/nimbus.jpg"
      alt="nimbus"
      title="nimbus"
      style={{ display: "block", width: "200px", height: "600px" }}
    />
  </div>
);
