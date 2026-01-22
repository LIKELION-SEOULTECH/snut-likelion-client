export type ApiQuestionTarget = "COMMON" | "PART" | "DEPARTMENT";
export type ApiQuestionType = "SHORT" | "LONG" | "RADIO_BUTTON";
export type ApiQuestionPart = "PLANNING" | "DESIGN" | "FRONTEND" | "BACKEND" | "AI";
export type ApiQuestionDepartmentType = "ACADEMIC" | "MARKETING" | "OPERATION";

export const mapServerToApiQuestionTarget = (target: string): ApiQuestionTarget => {
    switch (target) {
        case "공통 질문":
        case "COMMON":
            return "COMMON";

        case "파트 질문":
        case "PART":
            return "PART";

        case "부서 질문":
        case "DEPARTMENT":
            return "DEPARTMENT";

        default:
            return "COMMON";
    }
};

export const mapServerToApiQuestionType = (type: string): ApiQuestionType => {
    switch (type) {
        case "SHORT":
        case "단답형":
            return "SHORT";

        case "LONG":
        case "장문형":
            return "LONG";

        case "RADIO_BUTTON":
        case "라디오 버튼형":
            return "RADIO_BUTTON";

        default:
            return "SHORT";
    }
};

export const mapServerToApiQuestionPart = (part?: string): ApiQuestionPart => {
    switch (part) {
        case "PLANNING":
        case "기획":
            return "PLANNING";

        case "DESIGN":
        case "디자인":
            return "DESIGN";

        case "FRONTEND":
        case "프론트엔드":
            return "FRONTEND";

        case "BACKEND":
        case "백엔드":
            return "BACKEND";

        case "AI":
            return "AI";

        default:
            return "PLANNING";
    }
};

export const mapServerToApiDepartmentType = (
    departmentType?: string
): ApiQuestionDepartmentType => {
    switch (departmentType) {
        case "ACADEMIC":
        case "학술부":
            return "ACADEMIC";

        case "MARKETING":
        case "홍보부":
            return "MARKETING";

        case "OPERATION":
        case "운영부":
            return "OPERATION";

        default:
            return "OPERATION";
    }
};
