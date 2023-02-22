import RichText from "@/lib/renderer/RichText";

type Props = {
  content: string;
};

export const MainExplanation: React.FC<Props> = ({ content }) => {
  return <RichText data={content} />;
};
