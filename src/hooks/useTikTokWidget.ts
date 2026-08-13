import { fetcher } from "@/lib/fetcher";
import { TWidgets } from "@/lib/widgets";
import { toast } from "react-toastify";
import { WidgetsService } from "@/services/WidgetsService";
import useSWR, { mutate } from "swr";

export const useTikTokWidgetData = (connect: TWidgets | null) => {
  return useSWR(
    connect ? WidgetsService.getWidgetData(connect) : null,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status > 400 && error.status < 500) {
          toast.error(error.message);
        }
        // if (key === "/api/user") return;
        // if (retryCount >= 10) return;
        // setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );
};
