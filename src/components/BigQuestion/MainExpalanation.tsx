type Props = {
  content: string;
};

const MainExplanation: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <div>Explanation: {content}</div>
    </div>
  );
};

export default MainExplanation;
