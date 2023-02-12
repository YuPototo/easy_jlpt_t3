type Props = {
  content: string;
};

const Explanation: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <div> {content}</div>
    </div>
  );
};

export default Explanation;
