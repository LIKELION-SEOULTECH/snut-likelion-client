import type { CreateBlogRequest } from "@/types/blog";
import axiosInstance from "../axiosInstance";

// 블로그 목록 조회
export const getAdminBlogList = async (
    category?: "OFFICIAL" | "UNOFFICIAL",
    page: number = 0,
    keyword?: string | null
) => {
    const res = await axiosInstance.get("/admin/blogs", {
        params: {
            category,
            page,
            keyword
        }
    });
    return res.data.data;
};

// 블로그 업로드
export const createAdminBlog = (data: CreateBlogRequest) => {
    return axiosInstance.post("/admin/blogs", data);
};

// 블로그 수정

// 블로그 단건 삭제
export const deleteAdminBlogs = async (ids: number[]) => {
    await Promise.all(ids.map((id) => axiosInstance.delete(`/blogs/${id}`)));
};

// 블로그 다중 삭제
