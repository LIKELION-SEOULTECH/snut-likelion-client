import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import axiosInstance from "./axiosInstace";

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

// 내 정보 수정

export const updateMyProfile = async (memberId: number, data: FormData) => {
    const token = localStorage.getItem("accessToken");

    return await axiosInstance.patch(`/api/v1/members/${memberId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
};
