import { useRecruitmentSchedule } from "./useRecruitment";

type VisualButtonType = "MANAGER_APPLY" | "MEMBER_APPLY" | null;

type RecruitmentData = {
    openDate?: string;
    closeDate?: string;
    generation: number;
} | null;

const getVisualButtonType = (
    now: Date,
    managerData: RecruitmentData,
    memberData: RecruitmentData
): VisualButtonType => {
    const managerOpen = managerData?.openDate ? new Date(managerData.openDate) : null;
    const managerClose = managerData?.closeDate ? new Date(managerData.closeDate) : null;
    const memberOpen = memberData?.openDate ? new Date(memberData.openDate) : null;
    const memberClose = memberData?.closeDate ? new Date(memberData.closeDate) : null;

    if (managerOpen && managerClose && now >= managerOpen && now <= managerClose) {
        return "MANAGER_APPLY";
    }
    if (memberOpen && memberClose && now >= memberOpen && now <= memberClose) {
        return "MEMBER_APPLY";
    }

    const upcoming = [];
    if (managerOpen && now < managerOpen) {
        upcoming.push({ type: "MANAGER_APPLY", open: managerOpen });
    }
    if (memberOpen && now < memberOpen) {
        upcoming.push({ type: "MEMBER_APPLY", open: memberOpen });
    }

    if (upcoming.length > 0) {
        upcoming.sort((a, b) => a.open.getTime() - b.open.getTime());
        return upcoming[0].type as VisualButtonType;
    }

    const past = [];
    if (managerClose && now > managerClose) {
        past.push({ type: "MANAGER_APPLY", close: managerClose });
    }
    if (memberClose && now > memberClose) {
        past.push({ type: "MEMBER_APPLY", close: memberClose });
    }

    if (past.length > 0) {
        past.sort((a, b) => b.close.getTime() - a.close.getTime());
        return past[0].type as VisualButtonType;
    }

    return "MEMBER_APPLY";
};

const getRecruitmentData = (
    res: { data?: RecruitmentData | RecruitmentData[] } | RecruitmentData | null
): RecruitmentData => {
    if (!res) return null;
    if (typeof res === "object" && "data" in res && res.data) {
        return Array.isArray(res.data) ? res.data[0] : res.data;
    }
    return res as RecruitmentData;
};

export const useCombinedRecruitment = () => {
    const { data: memberRes } = useRecruitmentSchedule("MEMBER");
    const { data: managerRes } = useRecruitmentSchedule("MANAGER");

    const managerData = getRecruitmentData(managerRes);
    const memberData = getRecruitmentData(memberRes);

    const now = new Date();

    const buttonType = getVisualButtonType(now, managerData, memberData);

    let determinedNextGeneration: number | null = null;
    let determinedCurrentGeneration: number | null = null;

    if (buttonType === "MANAGER_APPLY" && managerData) {
        determinedCurrentGeneration = managerData.generation;
        determinedNextGeneration = managerData.generation + 1;
    } else if (buttonType === "MEMBER_APPLY" && memberData) {
        determinedCurrentGeneration = memberData.generation;
        determinedNextGeneration = memberData.generation + 1;
    } else {
        determinedNextGeneration =
            (managerData?.generation ?? memberData?.generation ?? 0) + 1 || null;
    }

    return {
        buttonType,
        nextGeneration: determinedNextGeneration,
        currentGeneration: determinedCurrentGeneration,
        isLoading: !memberRes && !managerRes
    };
};
