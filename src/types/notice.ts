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

// 공지사항 업로드 타입
export interface CreateNoticeRequest {
    title: string;
    content: string;
    pinned: boolean;
    imageStoredFileNames?: string[];
    fileStoredFileNames?: string[];
}

// 공지사항 수정 시 사용하는 데이터 타입 정의
export interface UpdateNoticePayload {
    title: string;
    content: string;
    pinned: boolean;
    type?: string;
}
