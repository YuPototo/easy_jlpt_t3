import type { EditorType } from "./SlateEditor";

const withImage = (editor: EditorType) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    // todo: fix type error
    return element.type === "image" ? true : isVoid(element);
  };

  return editor;
};

export default withImage;
