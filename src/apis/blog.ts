import axiosInstance from "./axiosInstance";
import type { CreateBlogRequest } from "@/types/blog";

export interface Blog {
    postId: number;
    title: string;
    updatedAt: string;
    thumbnailUrl: string;
    type: string | null;
}

export interface BlogDetail {
    postId: number;
    title: string;
    updatedAt: string;
    contentHtml: string;
    images: string[];
    authorName: string;
    category: "OFFICIAL" | "UNOFFICIAL";
    taggedMemberNames: string[];
}

interface GetBlogParams {
    page?: number; // 기본값 0
    size?: number; // 기본값 12
    category: "OFFICIAL" | "UNOFFICIAL";
}

export interface BlogListResponse {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    content: Blog[];
}

export const getBlogList = async (params: GetBlogParams): Promise<BlogListResponse> => {
    const res = await axiosInstance.get("/blogs", {
        params: {
            page: params.page ?? 0,
            size: params.size ?? 12,
            category: params.category
        }
    });
    return res.data.data;
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

// apis/blog.ts
export const uploadBlogImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await axiosInstance.post("/blogs/images", formData);
    console.log(res.data.data);
    return res.data.data.urls; // ✅ 정확히 배열만 리턴
};
