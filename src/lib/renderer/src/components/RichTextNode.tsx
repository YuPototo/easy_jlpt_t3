import React from "react";
import type { RichTextElement, RichTextNode } from "../schema";
import { isElement } from "../schema";
import Leaf from "./Leaf";
import Paragraph from "./Paragraph";
import Filler from "./Filler";
import { RichTextImage } from "./Image";
import { assertUnreachable } from "../../../typeUtils/assertUnreacherbale";

const renderElement = (element: RichTextElement) => {
  switch (element.type) {
    case "filler":
      return <Filler />;

    case "paragraph":
      return <Paragraph element={element} />;

    case "image":
      return <RichTextImage element={element} />;

    default:
      assertUnreachable(element);
  }
};

type Props = {
  value: RichTextNode;
};

export default function Node({ value }: Props) {
  if (isElement(value)) {
    return renderElement(value);
  }
  return <Leaf {...value} />;
}
