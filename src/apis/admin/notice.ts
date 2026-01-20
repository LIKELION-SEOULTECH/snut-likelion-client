import axiosInstance from "../axiosInstance";

// 소식 목록 조회
export const getAdminNotices = async (params?: { keyword?: string; page?: number }) => {
    const res = await axiosInstance.get("/admin/notices", {
        params
    });
    return res.data.data;
};

// 공지사항 생성
export const createAdminNotice = async (notice: {
    title: string;
    content: string;
    pinned: boolean;
}) => {
    const res = await axiosInstance.post("/admin/notices", notice);
    return res.data;
};
// 공지 수정

// 핀 토글

// 공지 단건 삭제

// 공지 다중 삭제
