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

// 공지사항 수정 시 사용하는 데이터 타입 정의
export interface UpdateNoticePayload {
    title: string;
    content: string;
    type?: string;
}
