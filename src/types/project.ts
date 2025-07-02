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
