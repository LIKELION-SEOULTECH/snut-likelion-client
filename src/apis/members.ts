import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import axiosInstance from "./axiosInstace";

// 내 정보 조회 : get
export const fetchMyMemberInfo = async (): Promise<MemberDetailResponse> => {
    const res = await axiosInstance.get("/members/me");
    return res.data.data;
};

// 사자 정보.. : get
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
