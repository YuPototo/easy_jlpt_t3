import type { RichTextElement } from "../schema";
import RichTextNodes from "./RichTextNodes";

type Props = {
  element: RichTextElement;
};

export default function Paragraph({ element }: Props) {
  return (
    <div>
      <RichTextNodes value={element.children} />
    </div>
  );
}
