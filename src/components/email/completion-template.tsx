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
    <Img
      src="http://drive.google.com/uc?export=view&id=1adbooetKdiDc2lSpv2rIeRJAo-mcnjv4"
      alt="nimbus"
      width="300"
      height="500"
    />
    ;
  </div>
);
