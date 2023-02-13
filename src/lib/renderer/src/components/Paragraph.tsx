import type { RichTextElementType } from "../schema";
import RichTextNodes from "./RichTextNodes";

type Props = {
  element: RichTextElementType;
};

export default function Paragraph({ element }: Props) {
  return (
    <div>
      <RichTextNodes value={element.children} />
    </div>
  );
}
