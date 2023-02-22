import RichText from "@/lib/renderer/RichText";
import { useBigQuestionContext } from "../context";

type Props = {
  content: string;
};

export const Explanation: React.FC<Props> = ({ content }) => {
  const { isDone } = useBigQuestionContext();

  return isDone ? (
    <div className="my-4">
      <RichText data={content} />
    </div>
  ) : (
    <></>
  );
};
