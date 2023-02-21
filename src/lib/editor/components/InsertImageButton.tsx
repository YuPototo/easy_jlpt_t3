import React from "react";
import { useSlateStatic } from "slate-react";
import ToolbarButton from "./ToolbarButton";
import isUrl from "is-url";
import imageExtensions from "image-extensions";
import { Transforms } from "slate";
import type { EditorType } from "../SlateEditor";
import type { ImageElement } from "@/lib/renderer/src/schema";

export function InsertImageButton() {
  const editor = useSlateStatic();

  return (
    <ToolbarButton
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        url && insertImage(editor, url);
      }}
    >
      <span className="text-sm">{"图"}</span>
    </ToolbarButton>
  );
}

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  if (!ext) return false;
  return imageExtensions.includes(ext);
};

const insertImage = (editor: EditorType, src: string) => {
  const image: ImageElement = {
    type: "image",
    src,
    alt: "image",
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, image);
};
