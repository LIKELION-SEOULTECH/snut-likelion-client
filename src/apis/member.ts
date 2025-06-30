import type { MemberListResponse } from "@/types/member";
import axiosInstance from "./axiosInstace";

// 멤버 리스트 조회 (검색 포함)
export const fetchMemberList = async (params?: {
    generation?: number;
    name?: string;
    role?: string;
    size?: number;
}): Promise<MemberListResponse> => {
    const res = await axiosInstance.get("/admin/members", { params });
    return res.data.data;
};

// 멤버 정보 수정
export const updateMember = async (
    memberId: number,
    data: {
        generation: number;
        part: string;
        role: "ROLE_USER" | "ROLE_ADMIN";
        department: string | null;
        username: string;
    }
): Promise<void> => {
    const { generation, ...body } = data;

    const res = await axiosInstance.put(
        `/admin/members/${memberId}?generation=${generation}`,
        body
    );
    return res.data.data;
};

// 특정기수의 멤버 정보 삭제
export const deleteMember = async (memberId: number, generation: number): Promise<void> => {
    const res = await axiosInstance.delete(`/admin/members/${memberId}?generation=${generation}`);
    return res.data.data;
};
