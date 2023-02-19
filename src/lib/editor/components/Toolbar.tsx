import { Editor } from "slate";
import { useSlate } from "slate-react";
import ToolbarButton from "./ToolbarButton";
import type { EditorType } from "../SlateEditor";
import InsertFillerButton from "./InsertFillerButton";

export type MarkFormat = "bold" | "underline";

export default function MyToolbar() {
  return (
    <div className="mb-1 flex items-center gap-1">
      <MarkButton format="bold">
        <span className="font-bold">b</span>
      </MarkButton>
      <MarkButton format="underline">
        <span className="underline">u</span>
      </MarkButton>
      <InsertFillerButton />
    </div>
  );
}

/*  MarkButton */
type MarkButtonType = {
  format: MarkFormat;
  children: React.ReactNode;
};

const MarkButton = ({ format, children }: MarkButtonType) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </ToolbarButton>
  );
};

const isMarkActive = (editor: EditorType, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: EditorType, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
