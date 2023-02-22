import RichText from "@/lib/renderer/RichText";

type Props = {
  content: string;
};

export const Body: React.FC<Props> = ({ content }) => {
  return <RichText data={content} />;
};
