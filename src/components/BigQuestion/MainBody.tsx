type Props = {
  content: string;
};

const MainBody: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <div>{content}</div>
    </div>
  );
};

export default MainBody;
