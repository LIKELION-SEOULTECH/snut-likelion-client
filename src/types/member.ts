export interface Member {
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
    generation: string;
    part: string;
    role: string;
}
