import type { MemberDetailResponse, MemberResponse } from "@/types/members";
import axiosInstance from "./axiosInstace";

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
