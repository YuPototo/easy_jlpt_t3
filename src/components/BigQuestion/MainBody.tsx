import RichText from "../../lib/renderer/src/RichText";

type Props = {
  content: string;
};

export const MainBody: React.FC<Props> = ({ content }) => {
  return <RichText data={content} />;
};
