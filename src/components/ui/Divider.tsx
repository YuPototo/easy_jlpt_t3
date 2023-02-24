export function Divider({ ...props }: JSX.IntrinsicElements["hr"]) {
  return (
    <hr className={"mx-auto my-2 w-36 border border-green-200"} {...props} />
  );
}
