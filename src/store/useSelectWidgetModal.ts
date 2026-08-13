import { create } from "zustand";

interface TSelectWidgetModal {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useSelectWidgetModal = create<TSelectWidgetModal>((set) => {
  return {
    isOpen: false,
    setOpen: (open) => {
      set({ isOpen: open });
    },
  };
});
