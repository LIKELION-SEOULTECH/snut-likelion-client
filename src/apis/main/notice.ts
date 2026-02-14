import axiosInstance from "../axiosInstance";
import type { Notice } from "@/types/notice";

// 공지사항 전체 조회
export const getAllNotices = async (): Promise<Notice[]> => {
    const res = await axiosInstance.get("/notices");
    return res.data.data.content; // content만 반환
};

// 공지사항 단건 조회
export const getNoticeById = async (noticeId: number): Promise<Notice> => {
    const res = await axiosInstance.get(`/notices/${noticeId}`);

    return res.data.data;
};

// 공지사항 작성
export const createNotice = async (notice: { title: string; content: string }) => {
    const res = await axiosInstance.post("/notices", notice);
    return res.data;
};

// 공지사항 수정
export const updateNotice = async (
    noticeId: number,
    update: { title: string; content: string; pinned: boolean }
) => {
    const res = await axiosInstance.patch(`/notices/${noticeId}`, update);
    return res.data;
};

// 공지사항 삭제
export const deleteNotice = async (noticeId: number) => {
    const res = await axiosInstance.delete(`/notices/${noticeId}`);
    return res.data;
};
