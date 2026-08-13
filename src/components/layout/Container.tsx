import { cn } from "utils/cn";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: Props) {
  return (
    <div
      className={cn("w-full max-w-[1440px] mx-auto h-full px-2 block", className)}
    >
      {children}
    </div>
  );
}
