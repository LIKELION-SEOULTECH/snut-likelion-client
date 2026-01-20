import type { Member } from "./members";
// 포트폴리오 링크
export type PortFolioLinkType = "GITHUB" | "NOTION" | "BEHANCE" | "BLOG" | "INSTAGRAM" | "OTHER";

// 포트폴리오 링크 상세
export interface PortfolioLink {
    name: PortFolioLinkType;
    url: string;
}
export interface SimplePortfolioLink {
    name: string;
    url: string;
}

// 멤버 응답 타입
export interface MemberResponse {
    id: number;
    username: string;
    generation: string;
    part: string;
    role: string;
}
export interface MemberListResponse {
    content: Member[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface MemberSearchResponse {
    id: number;
    name: string;
    profileImageUrl: string;
    generation: number;
    role: string;
    part: string;
    intro: string;
    major: string;
    portfolioLinks: PortfolioLink[];
}

export interface MemberDetailResponse {
    id: number;
    name: string;
    profileImageUrl: string;
    intro: string;
    description: string;
    role?: "string";
    saying?: "string";
    email: string;
    generations: number[];
    portfolioLinks: {
        id: number;
        name: "GITHUB" | "NOTION" | "BEHANCE" | "BLOG" | "INSTAGRAM" | "OTHER";
        url: string;
    }[];
    stacks: string[];
}

export interface ParticipatingProject {
    id: number;
    name: string;
    thumbnailUrl: string;
}

// 개별 상세 정보...
export interface LionInfoDetailsResponse {
    generation: number;
    role: "대표" | "운영진" | "아기사자" | "이전 기수";
    part: "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";
    projects: ParticipatingProject[];
}

// 멤버 검색
export interface MemberSearch {
    id: number;
    name: string;
    part: "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";
    generation: number;
    profileImageUrl: string;
}

export interface MemberSearchResponse {
    id: number;
    name: string;
    part: string;
    generation: number;
    profileImageUrl: string;
    data?: string;
}

export interface UpdateProfileRequest {
    name?: string;
    phoneNumber?: string;
    email?: string;
}

export interface MemberQueryParams {
    generation?: number;
    role?: string;
}

// 쿼리 파라미터 (기수, 운영진 여부)
export interface MemberQueryParams {
    generation?: number;
    isManager?: boolean;
}

// 멤버 관리 검색 필터 타입 정의
export interface MemberFilter {
    generation: number | null;
    part: string;
    role: string;
    keyword: string;
}
