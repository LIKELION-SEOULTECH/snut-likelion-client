import { create } from "zustand";

interface RecruitManageState {
    isManageMode: boolean;
    toggleManageMode: () => void;
    setManageMode: (value: boolean) => void;
}

export const useRecruitManageStore = create<RecruitManageState>((set) => ({
    isManageMode: false,
    toggleManageMode: () => set((state) => ({ isManageMode: !state.isManageMode })),
    setManageMode: (value) => set({ isManageMode: value })
}));
