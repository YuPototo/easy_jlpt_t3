import type { ReactElement } from "react";
import React from "react";
import type { ImageElement } from "../../../editor/editorTypes";

type Props = {
  element: ImageElement;
};

export function RichTextImage({ element }: Props): ReactElement {
  console.log(element);
  return (
    <div>
      <img src={element.src} alt={element.alt}></img>
    </div>
  );
}
//https://www.shutterstock.com/image-illustration/illustration-international-passengers-infrared-thermal-600w-1640970700.jpg
