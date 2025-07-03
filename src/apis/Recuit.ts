// import type { MyApplicationsResponse, RecruitmentResponse } from "@/types/recruits";
// import axiosInstance from "./axiosInstance";

// export const fetchMyApplications = async (): Promise<MyApplicationsResponse[]> => {
//     const res = await axiosInstance.get("/applications/me");
//     console.log(res);
//     return res.data;
// };

// export const fetchRecruitments = async (
//     recruitmentType: "MEMBER" | "MANAGER"
// ): Promise<RecruitmentResponse[]> => {
//     const { data } = await axiosInstance.get<RecruitmentResponse[]>("/recruitments", {
//         params: { recruitmentType }
//     });
//     return data;
// };

// export const typeMap = {
//     아기사자: "MEMBER",
//     운영진: "MANAGER"
// } as const;
