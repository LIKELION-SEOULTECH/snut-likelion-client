import axiosInstance from "./axiosInstance";
import type { MemberListResponse } from "@/types/member";

export interface UpdateProfileRequest {
    name?: string;
    phoneNumber?: string;
    email?: string;
}

export interface MemberQueryParams {
    generation?: number;
    role?: string;
}

// ✅ 유저 정보 수정
export const updateMemberInfo = (memberId: number, data: UpdateProfileRequest) => {
    return axiosInstance.patch(`/members/${memberId}`, data);
};

// ✅ 멤버 검색 (키워드)
export const searchMembers = (keyword: string) => {
    return axiosInstance.get("/members/search", {
        params: { keyword }
    });
};

// 멤버 리스트 조회 (검색 포함)
export const fetchMemberList = async (params?: {
    generation?: number;
    role?: string;
    size?: number;
    keyword?: string;
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
