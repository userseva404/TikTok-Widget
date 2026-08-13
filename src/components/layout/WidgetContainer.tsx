import { cn } from "utils/cn";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function WidgetContainer({ className = "", children, ...props }: Props) {
  return (
    <div className={cn("widget__container", className)} {...props}>
      {children}
    </div>
  );
}
