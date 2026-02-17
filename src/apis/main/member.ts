import axiosInstance from "../axiosInstance";
import type { MemberDetailResponse, MemberResponse } from "@/types/members";
import type { LionInfoDetailsResponse, MemberQueryParams, UpdateProfile } from "@/types/member";

// 기수 및 역할별 멤버 조회
export const fetchMembers = async (params: MemberQueryParams): Promise<MemberResponse[]> => {
    const res = await axiosInstance.get("/members", { params });
    return res.data.data;
};

// 내 정보 상세 조회 (아기사자 이상 권한 유저만 가능)
export const fetchMyMemberInfo = async (): Promise<MemberDetailResponse> => {
    const res = await axiosInstance.get("/members/me");
    return res.data.data;
};

// 멤버 정보 상세조회 (멋사 회원만 조회 가능)
export const fetchMemberDetail = async (id: number): Promise<MemberDetailResponse> => {
    const res = await axiosInstance.get(`/members/${id}`);
    return res.data.data;
};

// 유저 정보 수정
export const updateUserProfile = async (memberId: number, data: UpdateProfile) => {
    const token = localStorage.getItem("accessToken");

    return await axiosInstance.patch(`/members/${memberId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
            // "Content-Type": "multipart/form-data"
        }
    });
};

// 멤버 멋사 활동 정보 조회
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

// 멤버 검색
export const getMemberSearchList = async ({ keyword }: { keyword: string }) => {
    return axiosInstance.get(`/members/search`, {
        params: { keyword }
    });
};

// 회원 탈퇴
export const deleteMyAccount = async (memberId: number) => {
    const token = localStorage.getItem("accessToken");

    return await axiosInstance.delete(`/members/${memberId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// 명언 리스트 조회
export const getSaying = async () => {
    const res = await axiosInstance.get("/sayings");
    return res.data.data;
};
