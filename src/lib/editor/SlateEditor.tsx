// Import the Slate editor factory.
import { useCallback, useState } from "react";
import type { Descendant } from "slate";
import { createEditor } from "slate";
import isHotkey from "is-hotkey";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import {
  Slate,
  Editable,
  withReact,
  DefaultElement as Paragraph,
} from "slate-react";
import RichTextImage from "./components/Image";

import type { MarkFormat } from "./components/Toolbar";
import Toolbar, { toggleMark } from "./components/Toolbar";
import Leaf from "./components/Leaf";
import Filler from "./components/Filler";
import { objectKeys } from "../typeUtils/objectKeys";
import withImage from "./withImage";

export type EditorType = ReturnType<typeof withReact>;

type Props = {
  initalValue: string;
  onChange: (value: string) => void;
  allowFiller?: boolean;
};

export default function SlateEditor({
  onChange,
  initalValue,
  allowFiller,
}: Props) {
  const [editor] = useState(() => withImage(withReact(createEditor())));

  useInlineConfig(editor);
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  const handleChange = (newValue: Descendant[]) => {
    // 判断编辑器内容是否发生改变
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAstChange) {
      onChange(JSON.stringify(newValue));
    }
  };

  // todo: remove as
  const data = JSON.parse(initalValue) as Descendant[];

  return (
    <div>
      <Slate editor={editor} value={data} onChange={handleChange}>
        <Toolbar allowFiller={allowFiller} />

        <div className="rounded border border-gray-300 bg-gray-50 px-4 py-3 shadow-green-100">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              for (const hotkey of objectKeys(HOTKEYS)) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
}

function useRenderElement() {
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "filler":
        return <Filler {...props} />;
      case "paragraph":
        return <Paragraph {...props} />;
      case "image":
        return (
          <RichTextImage attributes={props.attributes} element={props.element}>
            {props.children}
          </RichTextImage>
        );
      default:
        return (
          <div className="my-2">
            <div className="text-sm text-red-700">未知数据类型</div>
            <div className="text-sm text-red-700">
              {JSON.stringify(props.element)}
            </div>
          </div>
        );
    }
  }, []);
  return renderElement;
}

function useRenderLeaf() {
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);
  return renderLeaf;
}

// 设置哪个 element 是 inline elmeent
function useInlineConfig(editor: EditorType) {
  const { isVoid, isInline } = editor;

  editor.isInline = (element) =>
    ["filler", "tip"].includes(element.type) || isInline(element);
  editor.isVoid = (element) =>
    ["filler"].includes(element.type) || isVoid(element);
}

type ValidHotKey = "mod+b" | "mod+u";
const HOTKEYS: Record<ValidHotKey, MarkFormat> = {
  "mod+b": "bold",
  "mod+u": "underline",
};
