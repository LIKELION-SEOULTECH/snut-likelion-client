import axiosInstance from "./axiosInstance";

export const createNotice = (data: { title: string; content: string; pinned: boolean }) => {
    return axiosInstance.post("/notices", data);
};

export const getAllNotices = () => {
    return axiosInstance.get("/notices");
};

export const getNoticeById = (noticeId: number) => {
    return axiosInstance.get(`/notices/${noticeId}`).then((res) => {
        console.log("📦 getNoticeById response:", res);
        return res;
    });
};

export const updateNotice = (noticeId: number, data: { title?: string; content?: string }) => {
    return axiosInstance.patch(`/notices/${noticeId}`, data);
};

export const deleteNotice = (noticeId: number) => {
    return axiosInstance.delete(`/notices/${noticeId}`);
};
