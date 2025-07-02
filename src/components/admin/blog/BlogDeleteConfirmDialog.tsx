// components/admin/blog/BlogDeleteConfirmDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BlogDeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export const BlogDeleteConfirmDialog = ({
    open,
    onClose,
    onDelete
}: BlogDeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col justify-center w-[390px] p-7 rounded-[8px] gap-2 [&>button.absolute]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">게시물 삭제</DialogTitle>
                </DialogHeader>
                <div className="text-center text-sm font-medium">
                    게시물이 영구적으로 삭제되며, 다시 복구할 수 없습니다.
                </div>
                <div className="flex h-11 justify-end gap-2 mt-4">
                    <button
                        onClick={onDelete}
                        className="flex-1 h-full border text-sm border-[#ff7700] text-black rounded-sm"
                    >
                        삭제하기
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 h-full bg-[#FF7700] text-sm text-white rounded-sm"
                    >
                        아니요
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
