import axiosInstance from "../axiosInstance";

// 블로그 목록 조회
export const getAdminBlogList = async (
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
    return res.data;
};
// 블로그 업로드

// 블로그 수정

// 블로그 단건 삭제
export const deleteAdminBlogs = async (ids: number[]) => {
    await Promise.all(ids.map((id) => axiosInstance.delete(`/blogs/${id}`)));
};

// 블로그 다중 삭제
