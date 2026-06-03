import axiosInstance from "../axiosInstance";
import type { Project, ProjectQueryParams, RetrospectionResponse } from "@/types/project";

type CreateProjectPayload = {
    name: string;
    intro: string;
    description: string;
    generation: number;
    category: string;
    imageStoredFileNames: string[];
    stacks: string[];
    websiteUrl?: string;
    playstoreUrl?: string;
    appstoreUrl?: string;
};

type UpdateProjectPayload = {
    name: string;
    intro: string;
    description: string;
    generation: number;
    category: string;
    newImageStoredFileNames: string[];
    stacks: string[];
    websiteUrl?: string;
    playstoreUrl?: string;
    appstoreUrl?: string;
};

// 프로젝트 생성
export const createProject = async (payload: CreateProjectPayload) => {
    const res = await axiosInstance.post("/projects", payload);
    return res.data;
};

// 프로젝트 수정
export const updateProject = async (projectId: number, payload: UpdateProjectPayload) => {
    const res = await axiosInstance.patch(`/projects/${projectId}`, payload);
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
export const createRetrospection = (
    projectId: number,
    data: {
        memberId: number;
        content: string;
    }
) => {
    return axiosInstance.post(`/projects/${projectId}/retrospections`, data);
};

// 프로젝트 회고 삭제
export const deleteRetrospection = (projectId: number, retrospectionId: number) => {
    return axiosInstance.delete(`/projects/${projectId}/retrospections/${retrospectionId}`);
};

// 프로젝트 이미지 단건 삭제
export const deleteProjectImage = async (projectId: number, imageStoredFileName: string) => {
    const res = await axiosInstance.delete(`/projects/${projectId}/images`, {
        params: { imageStoredFileName }
    });

    return res.data;
};
