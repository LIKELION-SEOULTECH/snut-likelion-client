import axiosInstance from "./axiosInstance";
import type { CreateBlogRequest, MyBlogType } from "@/types/blog";

export const fetchBlogList = async (
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
    return res.data; // { content: [...], totalElements, totalPages, ... }
};

// ✅ 블로그 단건 조회
export const fetchBlogDetail = (postId: number) => {
    return axiosInstance.get(`/blogs/${postId}`);
};

// ✅ 블로그 게시글 작성
export const createBlog = (data: { title: string; content: string }) => {
    return axiosInstance.post("/blogs", data);
};

// ✅ 블로그 게시글 수정
export const updateBlog = (postId: number, data: { title: string; content: string }) => {
    return axiosInstance.patch(`/blogs/${postId}`, data);
};

// ✅ 블로그 게시글 삭제
export const deleteBlog = (postId: number) => {
    return axiosInstance.delete(`/blogs/${postId}`);
};

// ✅ 임시저장 불러오기
export const fetchDraft = () => {
    return axiosInstance.get("/blogs/drafts/me");
};

// ✅ 임시저장 저장/덮어쓰기
export const saveDraft = (data: { title: string; content: string }) => {
    return axiosInstance.post("/blogs/drafts", data);
};

// ✅ 임시저장 삭제
export const deleteDraft = () => {
    return axiosInstance.delete("/blogs/drafts/me");
};

export const fetchAdminSingleBlog = async (postId: number) => {
    const res = await axiosInstance.get(`/blogs/${postId}`);
    console.log(res.data.data);
    return res.data.data;
};

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

// 마이페이지 : 블로그 조회 : get

export const fetchMyBlogs = async (): Promise<MyBlogType[]> => {
    const response = await axiosInstance.get("/blogs/me");

    return response.data.data.content.map((blog: MyBlogType) => ({
        postId: blog.postId,
        title: blog.title,
        updatedAt: blog.updatedAt,
        blogCategory: blog.blogCategory ?? "UNOFFICIAL"
    }));
};
