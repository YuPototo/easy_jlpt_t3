import clsx from "clsx";
import type { RenderLeafProps } from "slate-react";

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      // 这里直接使用了 renderer 的 className
      className={clsx({
        "font-bold": props.leaf.bold,
        underline: props.leaf.underline,
      })}
    >
      {props.children}
    </span>
  );
};

export default Leaf;
