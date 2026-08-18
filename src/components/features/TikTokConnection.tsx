import { widgetsApi } from "@/lib/widgets";
import { ConnectionCard } from "../ui/ConnectionCard";

export interface IConnectionComponentProps {
  active: boolean;
}

export function TikTokConnection({ active }: IConnectionComponentProps) {
  return (
    <ConnectionCard
      active={active}
      href={widgetsApi["tiktok"].callback}
      className="interact:border-purple-600"
    >
      <div className="flex items-center gap-2">
        <img className="size-7" src="/tiktok.png" alt="tiktok icon" />
        <p>TikTok</p>
      </div>
    </ConnectionCard>
  );
}
