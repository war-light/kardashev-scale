import { create } from "zustand";

interface StoreState {
  selectedType: number | undefined;
  updateSelectedType: (type: number) => void;
}

export const basicStore = create<StoreState>((set) => ({
  selectedType: undefined,
  updateSelectedType: (type) => set({ selectedType: type }),
}));
