import type { RichTextNode as RichTextNodeType } from "../schema";
import { nanoid } from "../utils/nanoid";
import RichTextNode from "./RichTextNode";

type Props = {
  value: RichTextNodeType[];
};

export default function RichTextNodes({ value }: Props) {
  return (
    <>
      {value.map((node) => (
        <RichTextNode key={nanoid()} value={node} />
      ))}
    </>
  );
}
