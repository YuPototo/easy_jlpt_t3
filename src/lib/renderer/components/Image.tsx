/* eslint-disable @next/next/no-img-element */
import type { ReactElement } from "react";
import React from "react";
import type { ImageElement } from "../schema";

type Props = {
  element: ImageElement;
};

// todo: use next/image
export function RichTextImage({ element }: Props): ReactElement {
  return (
    <div className="relative">
      <img src={element.src} alt={element.alt}></img>
    </div>
  );
}
//https://www.shutterstock.com/image-illustration/illustration-international-passengers-infrared-thermal-600w-1640970700.jpg
