// 파트 라벨 매핑
export const PART_LABEL_MAP = {
    PLANNING: "기획자",
    DESIGN: "디자이너",
    FRONTEND: "프론트엔드",
    BACKEND: "백엔드",
    AI: "인공지능"
} as const;

export type PartType = keyof typeof PART_LABEL_MAP;

export const getPartLabel = (part?: string) => {
    if (!part) return "-";
    return PART_LABEL_MAP[part as PartType] ?? part;
};

// 운영진 부서 라벨 매핑
export const DEPARTMENT_LABEL_MAP = {
    ACADEMIC: "학술부",
    MARKETING: "홍보부",
    OPERATION: "운영부"
} as const;

export type DepartmentType = keyof typeof DEPARTMENT_LABEL_MAP;

export const getDepartmentLabel = (department?: string) => {
    if (!department) return "-";
    return DEPARTMENT_LABEL_MAP[department as DepartmentType] ?? department;
};

// admin 멤버 역할 enum label값
export const roleToEnumValue = (role: string) => {
    switch (role) {
        case "아기 사자":
            return "ROLE_USER";
        case "운영진":
            return "ROLE_MANAGER";
        case "ROLE_USER":
        case "ROLE_MANAGER":
        case "ROLE_ADMIN":
            return role;
        default:
            return "";
    }
};

// admin 운영진 부서 enum label값
export const departmentToEnumValue = (department: string) => {
    switch (department) {
        case "운영부":
            return "OPERATION";
        case "홍보부":
            return "MARKETING";
        case "학술부":
            return "ACADEMIC";
        default:
            return "";
    }
};

// admin member 지원 파트 value값 라벨링
export const partToEnumValue = (part: string): string => {
    switch (part) {
        case "프론트엔드":
            return "FRONTEND";
        case "백엔드":
            return "BACKEND";
        case "디자인":
            return "DESIGN";
        case "기획":
            return "PLANNING";
        case "AI":
            return "AI";
        default:
            return "";
    }
};
