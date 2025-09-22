import axiosInstance from "../axiosInstance";
import type { Project, ProjectQueryParams } from "@/types/project";

// 프로젝트 생성

// 프로젝트 전체 조회
export const fetchAllProjects = async (params?: ProjectQueryParams): Promise<Project[]> => {
    const res = await axiosInstance.get("/projects", {
        params
    });

    console.log(res.data);
    return res.data.data;
};

// 프로젝트 상세 조회
export const getProjectDetail = async (id: number) => {
    const res = await axiosInstance.get(`/projects/${id}`);
    return res.data;
};

// 프로젝트 삭제
export const deleteProjectById = async (id: number) => {
    return await axiosInstance.delete(`/projects/${id}`);
};

// 프로젝트 회고 전체 조회
export const getRetrospections = async (projectId: number) => {
    const res = await axiosInstance.get(`/projects/${projectId}/retrospections`);
    console.log(res.data);
    return res.data.data;
};

// 프로젝트 회고 삭제
export const deleteRetrospection = (projectId: number, retrospectionId: number) => {
    return axiosInstance.delete(`/api/v1/projects/${projectId}/retrospections/${retrospectionId}`);
};

// 프로젝트 이미지 단건 삭제
export const deleteProjectImage = (projectId: number) => {
    return axiosInstance.delete(`/api/v1/projects/${projectId}/images`);
};
