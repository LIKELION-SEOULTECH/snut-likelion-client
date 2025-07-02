export interface Notice {
    noticeId: number;
    // tag: string;
    title: string;
    pinned: boolean;
    // writer: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminNotice {
    noticeId: number;
    tag: string;
    title: string;
    pinned: boolean;
    writer: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
