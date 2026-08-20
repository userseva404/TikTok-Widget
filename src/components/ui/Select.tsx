import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import * as RSelect from "@radix-ui/react-select";
import { CheckCircle, ChevronDown } from "lucide-react";

export const Select = forwardRef<
  HTMLButtonElement,
  RSelect.SelectProps &
    React.ComponentPropsWithoutRef<"div"> & { placeholder?: string }
>(({ className = "", placeholder = "", children, ...props }, ref) => (
  <RSelect.Root {...props}>
    <RSelect.Trigger
      ref={ref}
      className={cn(
        "bg-input font-medium text-[1.25rem] rounded-xl border-border border px-4 py-0.5 inline-flex gap-2 items-center interact:ring-1 interact:ring-primary",
        className,
      )}
    >
      <RSelect.Value placeholder={placeholder} />
      <RSelect.Icon asChild>
        <ChevronDown />
      </RSelect.Icon>
    </RSelect.Trigger>
    <RSelect.Portal>
      <RSelect.Content
        position="popper"
        className="w-[var(--radix-select-trigger-width)] overflow-hidden bg-input border border-border"
      >
        <RSelect.Viewport className="p-2">{children}</RSelect.Viewport>
      </RSelect.Content>
    </RSelect.Portal>
  </RSelect.Root>
));

export const SelectItem = forwardRef<HTMLDivElement, RSelect.SelectItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <RSelect.Item
        ref={ref}
        className={cn(
          "truncate text-text-primary text-[1.15rem] interact:bg-secondary bg-card rounded-[6px] flex justify-between items-center px-1 py-1",
          className,
        )}
        {...props}
      >
        <RSelect.ItemText>{children}</RSelect.ItemText>
        <RSelect.ItemIndicator className="text-primary" asChild>
          <CheckCircle />
        </RSelect.ItemIndicator>
      </RSelect.Item>
    );
  },
);

Select.displayName = "Select";
SelectItem.displayName = "SelectItem";
