type ButtonType = "NOTIFY" | "MANAGER_APPLY" | "MEMBER_APPLY" | null;

export const getRecruitmentButtonText = (buttonType: ButtonType, nextGeneration: number | null): string | null => {
    switch (buttonType) {
        case "MANAGER_APPLY":
            return `${nextGeneration && nextGeneration - 1 + "기"} 운영진 지원하기 →`;
        case "NOTIFY":
            return `${nextGeneration && nextGeneration + "기"} 모집 알림 받기 →`;
        case "MEMBER_APPLY":
            return `${nextGeneration && nextGeneration - 1 + "기"} 아기사자 지원하기 →`;
        default:
            return null;
    }
};
