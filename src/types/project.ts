export interface ProjectData {
    id: number;
    title: string;
    description: string;
    class: string;
    tag: string;
    stack: string[];
    image: string;
}

export interface Project {
    id: number;
    title: string;
    gen: string; // 예: "13기"
    type: string; // 예: "아이디어톤", "데모데이", "중앙 해커톤"
    createdAt: string; // ISO 날짜 형식: "YYYY-MM-DD"
}
