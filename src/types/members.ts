// 포트폴리오 링크
export type PortFolioLinkType = "GITHUB" | "NOTION" | "BEHANCE" | "BLOG" | "OTHER";

// 포트폴리오 링크 상세
export interface PortfolioLink {
    name: PortFolioLinkType;
    url: string;
}

export interface Member {
    id: number;
    username: string;
    part: string;
    role: string;
    department?: string;
    generation: number | string;
}

// 멤버 응답 타입
export interface MemberResponse {
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
    email: string;
    generations: number[];
    portfolioLinks: {
        id: number;
        name: "GITHUB" | "NOTION" | "BEHANCE" | "BLOG" | "INSTAGRAM" | "OTHER";
        url: string;
    }[];
    stacks: string[];
}
