import create from "zustand";
import { combine } from "zustand/middleware";

export const useDialog = create(
  combine({ dialog: <></> }, (set) => ({
    setDialog: (dialog: JSX.Element) => {
      set({ dialog: dialog });
    },
  }))
);
