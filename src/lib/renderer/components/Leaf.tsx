import clsx from "clsx";

type Props = {
  text: string;
  bold?: boolean;
  underline?: boolean;
};

export default function Leaf({ text, bold, underline }: Props) {
  return (
    <span className={clsx({ "font-bold": bold, underline: underline })}>
      {text}
    </span>
  );
}
