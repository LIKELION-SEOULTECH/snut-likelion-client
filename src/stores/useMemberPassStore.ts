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

            console.log("Member 최초 선택");
            console.log("기준 상태:", status);
            console.log("현재 passIds:", [id]);
            return;
        }

        // 다른 상태 선택 불가
        if (baseStatus !== status) {
            console.log("Member 다른 상태 선택 불가");
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

        console.log("🔁 Member toggle");
        console.log("현재 passIds:", nextIds);
    },

    addMany: (ids, status) => {
        const { baseStatus } = get();

        // 최초 등록
        if (!baseStatus) {
            set({
                passIds: ids,
                baseStatus: status
            });

            console.log("Member addMany 최초 설정");
            console.log("기준 상태:", status);
            console.log("현재 passIds:", ids);
            return;
        }

        // 상태 다르면 막기
        if (baseStatus !== status) {
            console.log("다른 상태의 id는 추가할 수 없음");
            return;
        }

        set((state) => ({
            passIds: Array.from(new Set([...state.passIds, ...ids]))
        }));

        console.log("➕ Member addMany");
        console.log("현재 passIds:", get().passIds);
    },

    clear: () => {
        console.log("🧹 Member 초기화");
        set({ passIds: [], baseStatus: null });
    }
}));
