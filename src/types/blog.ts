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
