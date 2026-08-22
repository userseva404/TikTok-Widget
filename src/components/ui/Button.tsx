import { cva, type VariantProps } from "class-variance-authority";

import * as Slot from "@radix-ui/react-slot";

const buttonVariant = cva("flex items-center justify-center rounded-xl", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-text interact:bg-primary-hover",
      secondary:
        "bg-secondary text-secondary-text interact:bg-secondary-hover border border-border",
      hollow:
        "stroke-text-primary  interact:bg-secondary-hover/40 border border-transparent interact:border-border rounded-xl",
      outline: "border-2 border-border interact:bg-secondary-hover/30",
    },
    size: {
      medium: "text-[1.35rem] px-4 py-0.5 rounded-[0.25em]",
      icon: "p-2",
      none: "p-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariant> & {
    asChild?: boolean;
  };

export function Button({
  variant,
  size,
  className = "",
  type = "button",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      type={!asChild ? type : undefined}
      className={buttonVariant({ variant, size, className })}
      {...props}
    />
  );
}
