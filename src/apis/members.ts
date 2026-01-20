import axiosInstance from "./axiosInstance";
import type { MemberDetailResponse, MemberResponse } from "@/types/members";
import type { LionInfoDetailsResponse } from "@/types/member";

// 쿼리 파라미터 (기수, 운영진 여부)
export interface MemberQueryParams {
    generation?: number;
    isManager?: boolean;
}

// 전체 조회 : get
export const fetchMembers = async (params: MemberQueryParams): Promise<MemberResponse[]> => {
    const res = await axiosInstance.get("/members", { params });
    return res.data.data;
};

// 특정 멤버 상세 조회 :get
export const fetchMemberDetail = async (id: number): Promise<MemberDetailResponse> => {
    const res = await axiosInstance.get(`/members/${id}`);
    return res.data.data;
};

// 내 정보 조회 : get
export const fetchMyMemberInfo = async (): Promise<MemberDetailResponse> => {
    const res = await axiosInstance.get("/members/me");
    return res.data.data;
};

// 디테일 사자 정보.. 기수[].플젝[]... : get
export const fetchLionInfo = async (
    memberId: number,
    generation: number
): Promise<LionInfoDetailsResponse> => {
    const res = await axiosInstance.get(`/members/${memberId}/lion-info`, {
        params: {
            generation
        }
    });
    return res.data.data;
};

// 내 정보 수정 : patch
export const updateMyProfile = async (memberId: number, data: FormData) => {
    const token = localStorage.getItem("accessToken");

    return await axiosInstance.patch(`/members/${memberId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
};

// 회원 탈퇴 : delete

export const deleteMyAccount = async (memberId: number) => {
    const token = localStorage.getItem("accessToken");

    return await axiosInstance.delete(`/members/${memberId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// 멤버 검색 : get
export const fetchMemberList = async ({ keyword }: { keyword: string }) => {
    return axiosInstance.get(`/members/search`, {
        params: { keyword }
    });
};
