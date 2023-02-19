import React from "react";
import type { ImageElement, RichTextElement, RichTextNode } from "../schema";
import { isElement } from "../schema";
import Leaf from "./Leaf";
import Paragraph from "./Paragraph";
import Filler from "./Filler";
import { RichTextImage } from "./Image";

const renderElement = (element: RichTextElement) => {
  switch (element.type) {
    case "filler":
      return <Filler />;

    case "paragraph":
      return <Paragraph element={element} />;

    case "image":
      // todo: remove as
      return <RichTextImage element={element as ImageElement} />;

    default:
      console.error(`unknown element type: ${element.type}`);
      return <></>;
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
