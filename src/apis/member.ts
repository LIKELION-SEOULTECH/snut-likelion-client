import axiosInstance from "./axiosInstance";
import type { MemberSearchResponse } from "@/types/member";

interface MemberSearchApiResponse {
    data: MemberSearchResponse[];
}

export const searchMembers = (keyword: string) => {
    return axiosInstance.get<MemberSearchApiResponse>("/members/search", {
        params: { keyword }
    });
};
