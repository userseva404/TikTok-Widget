import { TWidgets } from "@/lib/widgets";
import { create } from "zustand";

interface TSelectWidget {
  widget: TWidgets | null;
  setWidget: (widget: TWidgets | null) => void;
}

export const useSelectWidget = create<TSelectWidget>((set) => {
  return {
    widget: null,
    setWidget: (widget) => {
      set({ widget: widget });
    },
  };
});
