import axiosInstance from "./axiosInstance";
import type { ProjectData, projectDetail, RetrospectionResponse } from "@/types/project";

// 쿼리 파라미터 (generation, category)
export interface ProjectQueryParams {
    generation?: number;
    category?: string;
}

// 전체 프로젝트 페이지 - 조회 : get
export const fetchAllProjects = async (params?: ProjectQueryParams): Promise<ProjectData[]> => {
    const res = await axiosInstance.get("/projects", { params });
    return res.data.data;
};

// 프로젝트 상세페이지 - 조회 : get
export const getProjectDetail = async (id: number): Promise<projectDetail> => {
    const { data } = await axiosInstance.get(`/projects/${id}`);
    return data.data;
};

// 프로젝트 상세페이지 - 회고록 조회 : get
export const fetchRetrospections = async (id: number): Promise<RetrospectionResponse[]> => {
    const { data } = await axiosInstance.get(`/projects/${id}/retrospections`);
    return data.data;
};
