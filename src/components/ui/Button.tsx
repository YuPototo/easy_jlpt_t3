import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const buttonClasses = cva(
  "transition ease-in-out duration-300 rounded-full shadow-md",
  {
    variants: {
      intent: {
        primary: [],
        secondary: [],
        danger: [],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
      },
      outline: {
        true: ["border", "bg-white", "text-green-700"],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        outline: false,
        class: [
          "bg-green-600",
          "text-white",
          "border-green-600",
          "hover:bg-green-700",
          "hover:border-green-700",
        ],
      },
      {
        intent: "primary",
        outline: true,
        class: [
          "border-green-600",
          "hover:bg-green-100",
          "bg-white",
          "text-green-600",
        ],
      },
      {
        intent: "secondary",
        outline: true,
        class: [
          "bg-white",
          "text-gray-600",
          "border-gray-600",
          "hover:bg-gray-100",
        ],
      },
      {
        intent: "danger",
        outline: true,
        class: [
          "border-red-600",
          "hover:bg-red-100",
          "bg-white",
          "text-red-600",
        ],
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
