import { fetcher } from "@/lib/fetcher";
import { cn } from "@/utils/cn";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface Props {
  children?: React.ReactNode;
  href: string;
  className?: string;
  active: boolean;
}

export function ConnectionCard({
  children,
  href,
  className = "",
  active,
}: Props) {
  return (
    <button
      onClick={async () => {
        const response = await fetcher(href);
        console.log("RESPONSE", response);

        if (response && response.url) {
          window.location.href = response.url;
        }
      }}
      className={cn(
        "flex items-center bg-secondary border border-border interact:border-primary interact:bg-secondary-hover p-3.5 text-[1.15rem] font-bold rounded-xl justify-between",
        className,
      )}
    >
      {children}
      {active && (
        <p className="flex gap-2">
          Active
          <CircleCheck className="size-7 fill-green-500 stroke-secondary" />
        </p>
      )}
    </button>
  );
}
