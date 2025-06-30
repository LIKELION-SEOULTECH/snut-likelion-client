// import type { CreateProjectRequest } from "@/types/project";
import type { Project } from "@/types/project";
import axiosInstance from "./axiosInstace";

export const createProject = async (formData: FormData): Promise<void> => {
    console.log(formData);
    const res = await axiosInstance.post("/projects", formData, {
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
export const updateProject = (id: string, data: FormData) => {
    console.log(data);
    return axiosInstance.patch(`/projects/${id}`, data);
};

// 프로젝트 삭제
export const deleteProjectById = async (id: number) => {
    return await axiosInstance.delete(`/projects/${id}`);
};

export const deleteMultipleProjects = async (ids: number[]) => {
    for (const id of ids) {
        await deleteProjectById(id); // 순차 삭제
    }
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
