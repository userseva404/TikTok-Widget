import { cn } from "@/utils/cn";
import { Palette } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
}

export function Logo({ className = "" }: Props) {
  return (
    <Link
      href={"/"}
      className={cn("flex items-center gap-2 select-none group", className)}
    >
      <div className="flex items-center justify-center p-1.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
        <Palette className="w-5 h-5 text-primary" strokeWidth={2.5} />
      </div>
      <p className="text-[1em] tracking-tight">
        <span className="font-bold text-primary">Seva</span>
        <span className="font-semibold text-text-primary">Widget</span>
      </p>
    </Link>
  );
}
