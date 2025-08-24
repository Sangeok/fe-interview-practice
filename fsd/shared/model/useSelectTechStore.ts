import { create } from "zustand";
import { TechType } from "./type";

export const useSelectTechStore = create<{
  tech: TechType;
  setTech: (tech: TechType) => void;
}>((set) => ({
  tech: "",
  setTech: (tech) => set({ tech }),
}));
