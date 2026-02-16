import { create } from "zustand";

export type KorApplicationStatus = "제출" | "불합격" | "서류 합격" | "최종 합격";

interface MemberPassStore {
    passIds: number[];
    baseStatus: KorApplicationStatus | null;
    toggle: (id: number, status: KorApplicationStatus) => void;
    addMany: (ids: number[], status: KorApplicationStatus) => void;
    clear: () => void;
}

export const useMemberPassStore = create<MemberPassStore>((set, get) => ({
    passIds: [],
    baseStatus: null,

    toggle: (id, status) => {
        const { passIds, baseStatus } = get();

        // 최초 선택
        if (!baseStatus) {
            set({
                passIds: [id],
                baseStatus: status
            });
            return;
        }

        // 다른 상태 선택 불가
        if (baseStatus !== status) {
            return;
        }

        let nextIds;

        if (passIds.includes(id)) {
            nextIds = passIds.filter((v) => v !== id);
        } else {
            nextIds = [...passIds, id];
        }

        set({
            passIds: nextIds,
            baseStatus: nextIds.length === 0 ? null : baseStatus
        });
    },

    addMany: (ids, status) => {
        const { baseStatus } = get();

        // 최초 등록
        if (!baseStatus) {
            set({
                passIds: ids,
                baseStatus: status
            });
            return;
        }

        // 상태 다르면 막기
        if (baseStatus !== status) {
            return;
        }

        set((state) => ({
            passIds: Array.from(new Set([...state.passIds, ...ids]))
        }));
    },

    clear: () => {
        set({ passIds: [], baseStatus: null });
    }
}));
