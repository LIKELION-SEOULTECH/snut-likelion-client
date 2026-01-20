import type { CreateBlogRequest } from "@/types/blog";
import axiosInstance from "../axiosInstance";

// 블로그 목록 조회
export const getBlogList = async (
    category: "OFFICIAL" | "UNOFFICIAL",
    page: number = 1,
    size: number = 100
) => {
    const res = await axiosInstance.get("/blogs", {
        params: {
            category,
            page,
            size
        }
    });
    return res.data.data;
};

// 블로그 글 단건 조회
export const getBlogDetail = async (postId: number) => {
    const res = await axiosInstance.get(`/blogs/${postId}`);
    console.log(res.data.data);
    return res;
};

// 블로그 게시글 작성
export const createBlog = (data: CreateBlogRequest, submit: boolean) => {
    return axiosInstance.post("/blogs", data, {
        params: { submit } // URL 쿼리 파라미터에 추가
    });
};

// 블로그 게시글 수정
export const updateBlog = (postId: number, data: { title: string; content: string }) => {
    return axiosInstance.patch(`/blogs/${postId}`, data);
};

// 블로그 게시글 삭제
export const deleteBlog = (postId: number) => {
    return axiosInstance.delete(`/blogs/${postId}`);
};

// 내가 쓴 글 불러오기
export const getMyBlog = async () => {
    const res = await axiosInstance.get(`/blogs/me`);
    console.log(res.data.data);
    return res.data.data.content;
};

// 임시저장 불러오기
export const fetchDraft = () => {
    return axiosInstance.get("/blogs/drafts/me");
};

// 임시저장 저장/덮어쓰기
export const saveDraft = (data: { title: string; content: string }) => {
    return axiosInstance.post("/blogs/drafts", data);
};

// 임시저장 삭제
export const deleteDraft = () => {
    return axiosInstance.delete("/blogs/drafts/me");
};

// 이미지 업로드 (URL 반환)
export const uploadBlogImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await axiosInstance.post("/blogs/images", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    console.log("image s3 urls 요청 결과", res.data.data);
    return res.data.data.urls;
};
