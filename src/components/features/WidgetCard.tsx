import { cn } from "utils/cn";

interface Props extends React.ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
}

export function WidgetCard({ className = "", children, ...props }: Props) {
  return (
    <button
      className={cn(
        "bg-card border-2 border-border rounded-xl flex items-center justify-center p-2 interact:bg-secondary-hover/30",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
