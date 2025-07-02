import axiosInstance from "./axiosInstace";

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
