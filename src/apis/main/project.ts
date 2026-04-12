import axiosInstance from "../axiosInstance";
import type { Project, ProjectQueryParams, RetrospectionResponse } from "@/types/project";

// 프로젝트 생성
export const createProject = async (payload: {
    name: string;
    intro: string;
    description: string;
    generation: number;
    category: string;
    imageStoredFileNames: string[];
    tags: string[];
    websiteUrl?: string;
    playstoreUrl?: string;
    appstoreUrl?: string;
}) => {
    const res = await axiosInstance.post("/projects", payload);
    return res.data;
};

// 프로젝트 전체 조회
export const fetchAllProjects = async (params?: ProjectQueryParams): Promise<Project[]> => {
    const res = await axiosInstance.get("/projects", {
        params
    });

    return res.data.data;
};

// 프로젝트 상세 조회
export const getProjectDetail = async (id: number) => {
    const res = await axiosInstance.get(`/projects/${id}`);
    return res.data.data;
};

// 프로젝트 삭제
export const deleteProject = async (projectId: number) => {
    await axiosInstance.delete(`/projects/${projectId}`);
};

// 프로젝트 회고 전체 조회
export const getRetrospections = async (projectId: number): Promise<RetrospectionResponse[]> => {
    const res = await axiosInstance.get(`/projects/${projectId}/retrospections`);
    return res.data.data;
};

// 프로젝트 회고 작성
export const createRetrospection = async (projectId: number, content: string) => {
    const res = await axiosInstance.post(`/projects/${projectId}/retrospections`, { content });
    return res.data;
};

// 프로젝트 회고 삭제
export const deleteRetrospection = (projectId: number, retrospectionId: number) => {
    return axiosInstance.delete(`/api/v1/projects/${projectId}/retrospections/${retrospectionId}`);
};

// 프로젝트 이미지 단건 삭제
export const deleteProjectImage = (projectId: number) => {
    return axiosInstance.delete(`/api/v1/projects/${projectId}/images`);
};
