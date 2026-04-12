import type { CreateProjectRequest } from "@/types/project";
import axiosInstance from "../axiosInstance";

// 프로젝트 리스트 조회
export const getAdminProjects = async (params?: {
    generation?: number | null;
    keyword?: string;
    page?: number;
}) => {
    const res = await axiosInstance.get("/admin/projects", {
        params
    });
    return res.data.data;
};

// 프로젝트 일괄 삭제
export const deleteMultipleProjects = async (ids: number[]) => {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", id.toString())); // 배열 형식으로 추가

    return await axiosInstance.delete(`/admin/projects?${params.toString()}`);
};

// 프로젝트 업로드
export const createAdminProject = async (data: Omit<CreateProjectRequest, "retrospections">) => {
    const res = await axiosInstance.post("/admin/projects", data);
    return res.data;
};

// 프로젝트 수정
export const updateAdminProject = (id: number, data: FormData) => {
    return axiosInstance.patch(`/admin/projects/${id}`, data);
};

// 프로젝트 이미지 삭제
