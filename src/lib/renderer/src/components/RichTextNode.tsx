import React from "react";
import type { RichTextElementType, RichTextNodeType } from "../schema";
import { isElement } from "../schema";
import Leaf from "./Leaf";
import Paragraph from "./Paragraph";
import Filler from "./Filler";

const renderElement = (element: RichTextElementType) => {
  switch (element.type) {
    case "filler":
      return <Filler />;

    case "paragraph":
      return <Paragraph element={element} />;

    default:
      console.error(`unknown element type: ${element.type}`);
      return <></>;
  }
};

type Props = {
  value: RichTextNodeType;
};

export default function Node({ value }: Props) {
  if (isElement(value)) {
    return renderElement(value);
  }
  return <Leaf {...value} />;
}
