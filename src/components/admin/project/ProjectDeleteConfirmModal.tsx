import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectDeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export const ProjectDeleteConfirmDialog = ({
    open,
    onClose,
    onDelete
}: ProjectDeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col justify-center w-[390px] p-7 rounded-[8px] gap-2 [&>button.absolute]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        프로젝트 삭제
                    </DialogTitle>
                </DialogHeader>
                <div className="text-center text-sm font-medium">
                    모든 정보가 영구적으로 삭제되며, 다시 복구할 수 없습니다.
                </div>
                <div className="flex h-11 justify-end gap-2 mt-4">
                    <button
                        onClick={onDelete}
                        className="flex-1 h-full text-sm border border-[#ff7700] text-black rounded-sm"
                    >
                        삭제하기
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 h-full text-sm bg-[#FF7700] text-white rounded-sm"
                    >
                        아니요
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
