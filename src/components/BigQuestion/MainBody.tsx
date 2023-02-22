import RichText from "@/lib/renderer/RichText";

type Props = {
  content: string;
};

export const MainBody: React.FC<Props> = ({ content }) => {
  return (
    <div className="my-6">
      <RichText data={content} />
    </div>
  );
};
