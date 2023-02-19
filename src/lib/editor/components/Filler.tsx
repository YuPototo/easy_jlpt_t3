import clsx from "clsx";
import type { ReactElement } from "react";
import React from "react";
import type { RenderElementProps } from "slate-react";
import { useFocused, useSelected } from "slate-react";

type Props = {
  attributes: RenderElementProps["attributes"];
  children: RenderElementProps["children"];
};
export default function Filler({ attributes, children }: Props): ReactElement {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <span
      {...attributes}
      className={clsx(
        "mx-2 border-b border-gray-500 px-4",
        selected && focused && "ring"
      )}
      contentEditable={false}
    >
      <span className="hidden">{children}</span>
    </span>
  );
}
