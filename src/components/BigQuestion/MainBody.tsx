import RichText from "../../lib/renderer/src/RichText";

type Props = {
  content: string;
};

const MainBody: React.FC<Props> = ({ content }) => {
  return <RichText data={content} />;
};

export default MainBody;
