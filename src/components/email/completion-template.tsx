import { Img } from "@react-email/components";

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
    <p style={{ fontWeight: "bold", fontSize: "1.2em", marginTop: "20px" }}>
      Love, Nimbus.
    </p>
    <Img
      src="http://drive.google.com/uc?export=view&id=1guy7YENhLXB1O72tDdQlDuQtPEmwItIS"
      alt="nimbus"
      width="300"
      height="300"
      style={{ borderRadius: "50%" }}
    />
    ;
  </div>
);
