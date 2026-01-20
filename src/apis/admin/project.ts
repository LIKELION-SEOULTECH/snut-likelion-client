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
    console.log(res.data.data);
    return res.data.data;
};

// 프로젝트 일괄 삭제
export const deleteMultipleProjects = async (ids: number[]) => {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", id.toString())); // 배열 형식으로 추가

    return await axiosInstance.delete(`/admin/projects?${params.toString()}`);
};

// 프로젝트 업로드
export const createAdminProject = async (formData: FormData): Promise<void> => {
    console.log(formData);
    const res = await axiosInstance.post("/admin/projects", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

// 프로젝트 수정
export const updateAdminProject = (id: number, data: FormData) => {
    console.log(data);
    return axiosInstance.patch(`/admin/projects/${id}`, data);
};

// 프로젝트 이미지 삭제
