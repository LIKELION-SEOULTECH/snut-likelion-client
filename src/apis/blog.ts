import axiosInstance from "./axiosInstace";
import type { CreateBlogRequest } from "@/types/blog";

export const getBlogList = () => {
    return axiosInstance.get("/blogs");
};

export const getBlogById = (postId: number) => {
    return axiosInstance.get(`/blogs/${postId}`);
};

export const createBlogPost = (data: CreateBlogRequest, submit: boolean) => {
    return axiosInstance.post(`/blogs?submit=${submit}`, data);
};

export const updateBlogPost = (postId: number, data: { submit: boolean }) => {
    return axiosInstance.patch(`/blogs/${postId}`, data);
};

export const deleteBlogPost = (postId: number) => {
    return axiosInstance.delete(`/blogs/${postId}`);
};

export const getMyPosts = () => {
    return axiosInstance.get("/blogs/me");
};

// export const getMyDraft = () => {
//     return axiosInstance.get("/api/v1/blogs/drafts/me");
// };

// export const saveOrUpdateDraft = (data: any) => {
//     return axiosInstance.post("/api/v1/blogs/drafts", data);
// };

// export const deleteDraft = () => {
//     return axiosInstance.delete("/api/v1/blogs/drafts/me");
// };

export const uploadBlogImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await axiosInstance.post("/blogs/images", formData);
    return response.data.urls; // ✅ 서버 응답 구조에 따라 수정
};
