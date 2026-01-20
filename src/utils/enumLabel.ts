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
