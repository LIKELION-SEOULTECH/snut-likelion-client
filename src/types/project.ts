export interface ProjectData {
    id: number;
    name: string;
    description: string;
    generation: number;
    tags: string[];
    category: ProjectCategory;
    thumbnailUrl: string;
}

export type Participant = {
    id: number;
    username: string;
};

export type projectDetail = {
    id: number;
    generation: number;
    name: string;
    intro: string;
    description: string;
    websiteUrl?: string;
    playstoreUrl?: string;
    appstoreUrl?: string;
    members: Participant[];
    tags: string[];
    category: ProjectCategory;
    imageUrls: string[];
};

export const categoryMap: Record<
    "IDEATHON" | "HACKATHON" | "DEMO_DAY" | "LONG_TERM_PROJECT",
    string
> = {
    IDEATHON: "아이디어톤",
    HACKATHON: "해커톤",
    DEMO_DAY: "데모데이",
    LONG_TERM_PROJECT: "장기 프로젝트"
};

// 프로젝트 회고..
export interface Writer {
    id: number;
    name: string;
    part: string; // 기획 | 디자인 | 백엔드 | 프론트엔드 | AI
}

export interface RetrospectionResponse {
    id: number;
    content: string;
    writer: Writer;
}
export interface Project {
    id: number;
    name: string;
    description: string;
    generation: number;
    tags: string[];
    category: "IDEATHON" | "HACKATHON" | "DEMO_DAY" | "LONG_TERM_PROJECT";
    thumbnailUrl: string;
    createAt?: string;
}

export type ProjectCategory = "IDEATHON" | "HACKATHON" | "DEMO_DAY" | "LONG_TERM_PROJECT";

export interface RetrospectionResponse {
    id: number;
    content: string;
    writer: {
        id: number;
        name: string;
        part: string;
    };
}

export interface ProjectDetailResponse {
    id: number;
    name: string;
    intro: string;
    description: string;
    generation: number;
    websiteUrl: string;
    playstoreUrl: string | null;
    appstoreUrl: string | null;
    tags: string[];
    members: { id: number; username: string }[];
    category: string; // "장기 프로젝트", "아이디어톤" 등
    imageUrls: string[];
}

export interface GetProjectListParams {
    generation?: string;
    type?: string;
    keyword?: string;
}
