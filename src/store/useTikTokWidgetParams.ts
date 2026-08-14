import { IWidgetParams } from "@/components/Widget";
import { TWidgets } from "@/lib/widgets";
import { create } from "zustand";

export interface WidgetParamsMap {
  tiktok: IWidgetParams;
}

type WidgetState = {
  [K in TWidgets]: {
    params: WidgetParamsMap[K];
  };
};

type WidgetStore = {
  clients: WidgetState;
  setParams: <K extends TWidgets>(
    widgetName: K,
    params: WidgetParamsMap[K],
  ) => void;
  getByClient: <K extends TWidgets>(widgetName: K) => WidgetParamsMap[K];
};

export const useWidgetParams = create<WidgetStore>((set, get) => {
  return {
    clients: {
      tiktok: {
        params: {
          description: false,
          small: false,
          stats: false,
          videoPartAnim: false,
        },
      },
    },
    setParams: (widgetName, params) =>
      set((state) => ({
        clients: {
          ...state.clients,
          [widgetName]: { params },
        } as WidgetState,
      })),
    getByClient(widgetName) {
      const client = get().clients[widgetName];
      return client.params;
    },
  };
});
