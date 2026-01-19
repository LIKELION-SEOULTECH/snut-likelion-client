import type { MemberListResponse } from "@/types/member";
import axiosInstance from "../axiosInstance";

// 멤버 정보 수정

// 특정 기수의 멤버 정보 삭제

// 멤버 리스트 조회 (검색 포함)
export const getAdminMemberSearchList = async (params?: {
    generation?: number | null;
    part?: string;
    role?: string;
    keyword?: string;
    size?: number;
    page?: number;
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
        role: string;
        department: string | null;
        username: string;
        // 권한 여부 추가
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
