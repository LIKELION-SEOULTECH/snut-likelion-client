// 블로그 분류 타입
export type BlogCategory = "OFFICIAL" | "UNOFFICIAL" | "";

// 블로그 조회 타입 (리스트)
export interface Blog {
    postId: number;
    title: string;
    updatedAt: string;
    thumbnailUrl: string;
}

// 블로그 상세 조회 타입
export interface BlogDetail {
    postId: number;
    title: string;
    updatedAt: string;
    contentHtml: string;
    images: string[];
    authorName: string;
    category: BlogCategory;
    taggedMemberNames: string[];
}

// admin blog 타입
export interface AdminBlog {
    id: number;
    category: string;
    title: string;
    author: string;
    createdAt: string;
}

export interface CreateBlogRequest {
    title: string;
    contentHtml: string;
    category: BlogCategory;
    taggedMemberIds?: number[];
    images?: string[];
}

export interface MyBlogType {
    postId: number;
    title: string;
    updatedAt: string;
    blogCategory?: "OFFICIAL" | "UNOFFICIAL";
}

export type GetBlogListParams = {
    category: BlogCategory;
    page?: number;
    size?: number;
};
