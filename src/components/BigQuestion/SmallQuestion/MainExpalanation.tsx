import RichText from "@/lib/renderer/RichText";

type Props = {
  content: string;
};

export const Explanation: React.FC<Props> = ({ content }) => {
  return <RichText data={content} />;
};
