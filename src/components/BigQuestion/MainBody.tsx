type Props = {
  content: string;
};

const MainBody: React.FC<Props> = ({ content }) => {
  return <div className="bg-green-50 p-2">{content}</div>;
};

export default MainBody;
