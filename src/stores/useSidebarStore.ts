// src/stores/useUIStore.ts
import { create } from "zustand";

interface UIState {
    isRecruitOpen: boolean;
    toggleRecruit: () => void;
    openRecruit: () => void;
    closeRecruit: () => void;
}

export const useSidebarStore = create<UIState>((set) => ({
    isRecruitOpen: false,
    toggleRecruit: () => set((state) => ({ isRecruitOpen: !state.isRecruitOpen })),
    openRecruit: () => set({ isRecruitOpen: true }),
    closeRecruit: () => set({ isRecruitOpen: false })
}));
