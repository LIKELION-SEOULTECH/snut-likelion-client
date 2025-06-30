import axiosInstance from "./axiosInstace";
import type { Notice } from "@/types/notice";

// 공지사항 작성
export const createNotice = async (notice: { title: string; content: string; pinned: boolean }) => {
    const res = await axiosInstance.post("/notices", notice);
    return res.data;
};

// 공지사항 전체 조회
export const fetchAllNotices = async (): Promise<Notice[]> => {
    const res = await axiosInstance.get("/notices");
    console.log("공지사항 전체 조회 응답:", res.data);

    return res.data.data.content; // content만 반환
};

// 공지사항 단건 조회
export const fetchNoticeById = async (noticeId: number): Promise<Notice> => {
    const res = await axiosInstance.get(`/notices/${noticeId}`);
    console.log("공지사항 조회 응답:", res.data.data);

    return res.data.data;
};

// 공지사항 수정
export const updateNotice = async (
    noticeId: number,
    update: { title: string; content: string; pinned: boolean }
) => {
    console.log("notice 수정 시작");
    const res = await axiosInstance.patch(`/notices/${noticeId}`, update);
    console.log(res.data);
    return res.data;
};

// 공지사항 삭제
export const deleteNotice = async (noticeId: number) => {
    const res = await axiosInstance.delete(`/notices/${noticeId}`);
    return res.data;
};
