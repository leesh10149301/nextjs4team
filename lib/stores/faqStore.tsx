import { create } from "zustand";

type FaqState = {
  faqVisible: boolean;
  setFaqVisible: (visible: boolean) => void;
};

export const useFaqStore = create<FaqState>((set) => ({
  faqVisible: false,
  setFaqVisible: (visible: boolean) => set({ faqVisible: visible }),
}));
