import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchNoticeById } from "@/apis/notice";
import AdminLayout from "@/layouts/AdminLayout";
import { deleteNotice } from "@/apis/notice";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
export const AdminNoticeDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data: notice } = useQuery({
        queryKey: ["notice", id],
        queryFn: () => fetchNoticeById(Number(id)),
        enabled: !!id
    });

    const handleConfirmDelete = async () => {
        try {
            await deleteNotice(Number(id));
            alert("삭제가 완료되었습니다.");
            navigate("/admin/notice"); // 목록 페이지로 이동
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("삭제에 실패했습니다.");
        } finally {
            setShowDeleteConfirm(false);
        }
    };

    return (
        <AdminLayout onToggleDeleteMode={() => setShowDeleteConfirm(true)}>
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
