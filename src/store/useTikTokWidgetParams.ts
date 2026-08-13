import { IWidgetParams } from "@/components/Widget";
import { create } from "zustand";

interface IuseTikTokWidgetParams {
  params: IWidgetParams;
  setParams: (params: IWidgetParams) => void;
}

export const useTikTokWidgetParams = create<IuseTikTokWidgetParams>((set) => {
  return {
    params: {
      description: false,
      small: false,
      stats: false,
      videoPartAnim: false,
    },
    setParams(params) {
      set({ params: params });
    },
  };
});
