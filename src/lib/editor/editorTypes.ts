// TypeScript users only add this code
import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

import type { ImageElement, RichTextText } from "../renderer/src/schema";

type ParagraphElement = { type: "paragraph"; children: RichTextText[] };
export type FillerElement = { type: "filler"; children: RichTextText[] };

export type CustomElement = ParagraphElement | FillerElement | ImageElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: RichTextText;
  }
}
