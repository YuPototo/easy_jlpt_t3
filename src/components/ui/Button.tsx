import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const buttonClasses = cva(
  "transition ease-in-out duration-300 rounded-full shadow-md",
  {
    variants: {
      intent: {
        primary: "",
        secondary: "",
        danger: "",
      },
      size: {
        small: "text-sm py-1 px-2",
        medium: "text-base py-2 px-4",
      },
      outline: {
        true: "border bg-white",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        outline: false,
        className:
          "text-white bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700",
      },
      {
        intent: "primary",
        outline: true,
        className: "text-green-600 border-green-600 hover:bg-green-100",
      },
      {
        intent: "secondary",
        outline: true,
        className: "text-gray-600 border-gray-600 hover:bg-gray-100",
      },
      {
        intent: "secondary",
        outline: false,
        className:
          "bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700",
      },
      {
        intent: "danger",
        outline: true,
        class: "border-red-600 hover:bg-red-100 text-red-600",
      },
      {
        intent: "danger",
        outline: false,
        class:
          "bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
      outline: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  outline,
  ...props
}) => (
  <button
    className={buttonClasses({ intent, size, outline, className })}
    {...props}
  />
);
