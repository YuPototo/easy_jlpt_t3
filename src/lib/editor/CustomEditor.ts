import { Editor } from "slate";
import _ from "lodash";
import type { RichTextElementType } from "../renderer/src/schema";

/**
 * Use custom editor to add custom methods to the editor
 * https://docs.slatejs.org/concepts/08-plugins#helper-functions
 */

export const CustomEditor = {
  ...Editor,
};

export const emptyParagraph: RichTextElementType = {
  type: "paragraph",
  children: [{ text: "" }],
};

export function createEmptyEditor() {
  const copy = _.cloneDeep(emptyParagraph);
  return [copy];
}
