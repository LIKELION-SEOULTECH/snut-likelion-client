export interface Member {
    id: number;
    name: string;
    generation: string;
    part: string;
    role: string;
}

export interface MemberSearchResponse {
    id: number;
    name: string;
    part: "기획" | "디자인" | "프론트엔드" | "백엔드" | "AI";
    generation: number;
    profileImageUrl: string;
    data?: string;
}
