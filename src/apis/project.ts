import type { Project } from "@/types/project";
import axiosInstance from "./axiosInstace";

export const createAdminProject = async (formData: FormData): Promise<void> => {
    console.log(formData);
    const res = await axiosInstance.post("/admin/projects", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const fetchAllProjects = async (): Promise<Project[]> => {
    const res = await axiosInstance.get("/projects");
    console.log(res.data);
    return res.data.data;
};

// 프로젝트 상세 조회
export const getProject = (id: string) => {
    return axiosInstance.get(`/projects/${id}`);
};

// 프로젝트 수정
export const updateAdminProject = (id: string, data: FormData) => {
    console.log(data);
    return axiosInstance.patch(`/admin/projects/${id}`, data);
};

// 프로젝트 삭제
export const deleteProjectById = async (id: number) => {
    return await axiosInstance.delete(`/projects/${id}`);
};

export const deleteMultipleProjects = async (ids: number[]) => {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", id.toString())); // 배열 형식으로 추가

    return await axiosInstance.delete(`/admin/projects?${params.toString()}`);
};

// 프로젝트 회고 전체 조회
export const getRetrospections = (projectId: string) => {
    return axiosInstance.get(`/projects/${projectId}/retrospections`);
};

// 프로젝트 회고 삭제
export const deleteRetrospection = (projectId: number, retrospectionId: number) => {
    return axiosInstance.delete(`/api/v1/projects/${projectId}/retrospections/${retrospectionId}`);
};

// 프로젝트 이미지 단건 삭제
export const deleteProjectImage = (projectId: number) => {
    return axiosInstance.delete(`/api/v1/projects/${projectId}/images`);
};

// admin 프로젝트 조회
export const fetchAdminProjects = async (params?: {
    generation?: string;
    keyword?: string;
    page?: number;
}) => {
    const res = await axiosInstance.get("/admin/projects", {
        params
    });
    console.log(res.data.data);
    return res.data.data;
};
