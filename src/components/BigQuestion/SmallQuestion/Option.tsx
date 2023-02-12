type Props = {
  content: string;
};

const Option: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <div>{content}</div>
    </div>
  );
};

export default Option;
