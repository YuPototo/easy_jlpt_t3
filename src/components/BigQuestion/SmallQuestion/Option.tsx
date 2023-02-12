type Props = {
  content: string;
};

const Option: React.FC<Props> = ({ content }) => {
  return <div className="my-4 bg-yellow-50 py-2 px-4">{content}</div>;
};

export default Option;
