export interface Blog {
    id: number;
    tag: string;
    title: string;
    writer: string;
    createdAt: string;
}

export interface AdminBlog {
    postId: number;
    tag: string;
    title: string;
    authorName: string;
    updatedAt: string;
}

export type BlogCategory = "OFFICIAL" | "UNOFFICIAL";

export interface CreateBlogRequest {
    title: string;
    contentHtml: string;
    category: BlogCategory;
    taggedMemberIds?: number[];
    images: string[];
}

export interface MyBlogType {
    postId: number;
    title: string;
    updatedAt: string;
    blogCategory?: "OFFICIAL" | "UNOFFICIAL";
}
