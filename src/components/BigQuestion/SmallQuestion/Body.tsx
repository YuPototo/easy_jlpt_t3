type Props = {
  content: string;
};

const Body: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <div>{content}</div>
    </div>
  );
};

export default Body;
