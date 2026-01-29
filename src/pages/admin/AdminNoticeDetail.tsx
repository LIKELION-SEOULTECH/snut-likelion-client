import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AdminLayout from "@/layouts/AdminLayout";
import { deleteNotice, getNoticeById } from "@/apis/main/notice";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { ADMIN, ADMIN_ABS, ROUTES } from "@/routes/routes";
import { toast, Toaster } from "sonner";
import { AlertCircle, CircleCheck } from "lucide-react";
export const AdminNoticeDetailPage = () => {
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data: notice } = useQuery({
        queryKey: ["notice", id],
        queryFn: () => getNoticeById(Number(id)),
        enabled: !!id
    });

    const deleteNoticeMutation = useMutation({
        mutationFn: (id: number) => deleteNotice(id),
        onSuccess: () => {
            toast(
                <div className="flex items-center gap-2">
                    <CircleCheck size={20} className="text-green-400" />
                    <span className="text-sm font-medium">공지가 삭제되었습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
            queryClient.invalidateQueries({
                queryKey: ["adminNotices"]
            });
            navigate(ADMIN_ABS.NOTICE);
        },
        onError: () => {
            toast(
                <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-sm font-medium">공지 삭제에 실패했습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
        },
        onSettled: () => {
            setShowDeleteConfirm(false);
        }
    });

    const handleConfirmDelete = () => {
        if (!id) return;
        deleteNoticeMutation.mutate(Number(id));
    };

    return (
        <AdminLayout
            onDelete={() => setShowDeleteConfirm(true)}
            onSubmit={() => {
                if (!id) return;
                navigate(`${ROUTES.ADMIN_BASE}/${ADMIN.NOTICE_EDIT.replace(":id", id)}`);
            }}
            onClickBackBtn={() => navigate(ADMIN_ABS.NOTICE)}
        >
            <Toaster position="top-center" offset={{ top: 120, left: 80 }} />

            {notice && (
                <div className="w-full flex flex-col bg-white mt-11 rounded-sm p-12 mb-12">
                    <div className="text-2xl font-bold text-[#FFA454] mb-5">공지</div>
                    <div className="text-[50px] font-bold whitespace-nowrap mb-[37px]">
                        {notice.title}
                    </div>
                    <div className="font-light text-[#666666] text-xl mb-[35px]">
                        {new Date(notice.updatedAt).toISOString().slice(0, 10)}
                    </div>
                    {notice && (
                        <div
                            className="text-xl"
                            dangerouslySetInnerHTML={{ __html: notice.content }}
                        />
                    )}
                </div>
            )}
            {showDeleteConfirm && (
                <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                    <DialogContent className="flex flex-col justify-center w-[390px] p-7 rounded-[8px] gap-2 [&>button.absolute]:hidden">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-center">
                                게시물 삭제
                            </DialogTitle>
                        </DialogHeader>
                        <div className="text-center text-sm font-medium">
                            게시물이 영구적으로 삭제되며, 다시 복구할 수 없습니다.
                        </div>
                        <DialogFooter className="flex h-11 justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="flex-1 h-full border border-[#ff7700] text-black rounded-sm"
                            >
                                삭제하기
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 h-full bg-[#FF7700] text-white rounded-sm"
                            >
                                아니요
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </AdminLayout>
    );
};
