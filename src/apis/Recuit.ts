import axiosInstance from "./axiosInstance";
import type { RecruitmentResponse } from "@/types/recruit";
// export const fetchMyApplications = async (): Promise<MyApplicationsResponse[]> => {
//     const res = await axiosInstance.get("/applications/me");
//     return res.data;
// };

export const fetchRecruitmentsByType = async (
    type: "MEMBER" | "MANAGER"
): Promise<RecruitmentResponse[]> => {
    const res = await axiosInstance.get("/recruitments", {
        params: { recruitmentType: type }
    });
    return res.data;
};

export const typeMap = {
    아기사자: "MEMBER",
    운영진: "MANAGER"
} as const;
