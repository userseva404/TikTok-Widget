import { swrFetcher } from "@/lib/fetcher";
import { TWidgets } from "@/lib/widgets";

import { WidgetsService } from "@/services/WidgetsService";
import useSWR from "swr";
import { useUser } from "./useUser";

export const useTikTokWidgetData = (connect: TWidgets | null) => {
  const { user } = useUser();

  return useSWR(
    connect && user ? WidgetsService.getWidgetData(connect, user?.id) : null,
    swrFetcher,
  );
};
