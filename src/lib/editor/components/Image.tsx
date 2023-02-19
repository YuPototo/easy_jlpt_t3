/* eslint-disable @next/next/no-img-element */
import type { ReactElement } from "react";
// import Button from "../../../components/ui/Button";
import type { ImageElement } from "../editorTypes";
import type { RenderElementProps } from "slate-react";
import { useSelected } from "slate-react";
import clsx from "clsx";

type Props = {
  attributes: RenderElementProps["attributes"];
  element: ImageElement;
  children: RenderElementProps["children"];
};

export default function Image({
  attributes,
  element,
  children,
}: Props): ReactElement {
  const selected = useSelected();

  return (
    <div
      {...attributes}
      className={clsx("relative max-w-fit", {
        ring: selected,
      })}
    >
      {/* Even if Void nodes don’t have any child nodes (like our image
            node as an example), we still need to render children and provide an
            empty text node as child (see ExampleDocument below) which is
            treated as a selection point of the Void element by SlateJS */}
      {children}

      {/**
       * contentEditable 必须放在这个 inner child 里，否则选中图片时无法按 enter
       */}
      <div contentEditable={false}>
        <img src={element.src} alt={element.alt}></img>
      </div>
    </div>
  );
}
