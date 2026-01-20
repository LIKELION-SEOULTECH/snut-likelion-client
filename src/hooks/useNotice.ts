// hooks/useNotice.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
} from "@/apis/notice";
import type { UpdateNoticePayload } from "@/types/notice";

// 전체 조회
export const useNotices = () => useQuery({ queryKey: ["notices"], queryFn: getAllNotices });

// 단건 조회
export const useNotice = (noticeId: number) =>
    useQuery({
        queryKey: ["notice", noticeId],
        queryFn: () => getNoticeById(noticeId),
        enabled: !!noticeId
    });

// 작성
export const useCreateNotice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { title: string; content: string; pinned: boolean }) =>
            createNotice(data),
        onSuccess: (data) => {
            console.log("✅ 공지 등록 성공:", data);
            queryClient.invalidateQueries({ queryKey: ["notices"] });
        },
        onError: (error) => {
            console.error("❌ 공지 등록 실패:", error);
        }
    });
};

// 수정
export const useUpdateNotice = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateNoticePayload }) =>
            updateNotice(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["notice", id] });
            queryClient.invalidateQueries({ queryKey: ["notices"] });
        }
    });
};

// 삭제
export const useDeleteNotice = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNotice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
        }
    });
};
