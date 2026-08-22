import { cn } from "@/utils/cn";
import { Button } from "../ui/Button";

interface Props extends React.ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
}

export function WidgetCard({ className = "", children, ...props }: Props) {
  return (
    <Button
      variant={"outline"}
      size={"medium"}
      className={cn(
        "py-2",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
