type Props = {
  content: string;
};

const MainExplanation: React.FC<Props> = ({ content }) => {
  return <div className="bg-gree-50 p-2">Explanation: {content}</div>;
};

export default MainExplanation;
