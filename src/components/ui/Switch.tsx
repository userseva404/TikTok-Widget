import * as RSwitch from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { cn } from "utils/cn";

interface Props extends Omit<RSwitch.SwitchProps, "value" | "onChange"> {
  className?: string;
  value: boolean | undefined;
  onChange?: (value: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, Props>(
  ({ className = "", value, onChange, ...props }, ref) => {
    return (
      <RSwitch.Root
        ref={ref}
        checked={value}
        onCheckedChange={onChange}
        className={cn(
          "bg-secondary min-w-[48px] min-h-[24px] relative rounded-full transition-colors data-[state=checked]:bg-primary-text",
          className,
        )}
        {...props}
      >
        <RSwitch.Thumb
          className={cn(
            "bg-secondary-text absolute top-1 bottom-1 left-1 aspect-square rounded-full",
            "transition-all duration-300 ease-in-out",
            "data-[state=checked]:left-[calc(100%-4px)] data-[state=checked]:-translate-x-full",
            "data-[state=checked]:bg-primary",
          )}
        />
      </RSwitch.Root>
    );
  },
);

Switch.displayName = "Switch";
