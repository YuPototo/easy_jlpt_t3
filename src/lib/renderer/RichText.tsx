import saveParseJson from "./utils/saveParseJson";
import { RootNodesSchema } from "./schema";
import RichTextNodes from "./components/RichTextNodes";

type Props = {
  data: string;
};

// todo: 考虑使用 memo 提高性能
export default function RichText({ data }: Props) {
  // step 1: parse data to json
  const parseJsonResult = saveParseJson(data);
  if (!parseJsonResult.success) {
    console.error(parseJsonResult.error);
    return <div className="text-sm text-red-500">JSON Parse Error</div>;
  }

  // step 2: parse schema
  const parsedObj = parseJsonResult.data;
  const parseSchemaResult = RootNodesSchema.safeParse(parsedObj);
  if (!parseSchemaResult.success) {
    console.error(parseSchemaResult.error);
    return <div className="text-sm text-red-500">Schema Parse Error</div>;
  }

  // step 3: render
  return (
    <div>
      <RichTextNodes value={parseSchemaResult.data} />
    </div>
  );
}
