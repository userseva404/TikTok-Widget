import { TWidgets } from "@/lib/widgets";
import {
  IConnectionComponentProps,
  TikTokConnection,
} from "./TikTokConnection";
import { useUserConnections } from "@/hooks/useUserReq";

type TWidgetConnections = {
  connection: TWidgets;
  component: ({ active }: IConnectionComponentProps) => React.ReactElement;
  provider: string;
};
const connections: TWidgetConnections[] = [
  {
    connection: "tiktok",
    component: TikTokConnection,
    provider: "tik_tok",
  },
];

function ProfileConnectionsContent() {
  const { data: bdConnections, error, isLoading } = useUserConnections();

  if (isLoading) {
    return <p>Loading your connections</p>;
  }

  if (error) {
    return <p>Error happened while fetching connections</p>;
  }

  if (bdConnections === undefined) {
    return <p>No connections found.</p>;
  }

  return (
    <div className="flex flex-col gap-2 pt-3 basis-full">
      {connections.map(({ connection, component: Component, provider }) => (
        <Component
          active={bdConnections.some((con) => con.provider === provider)}
          key={connection}
        />
      ))}
    </div>
  );
}

export function ProfileConnections() {
  return (
    <div className="flex items-center justify-center">
      <ProfileConnectionsContent />
    </div>
  );
}
