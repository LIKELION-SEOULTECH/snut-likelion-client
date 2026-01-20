import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectDeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
}

export const ProjectDeleteConfirmDialog = ({ open, onClose }: ProjectDeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col justify-center w-97 h-[158px] p-7 rounded-[8px] gap-8 [&>button.absolute]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        프로젝트 삭제되었습니다
                    </DialogTitle>
                </DialogHeader>
                <div className="flex h-[42px] justify-center gap-2">
                    <button
                        onClick={onClose}
                        className="w-[158px] h-full text-sm bg-[#FF7700] text-white rounded-sm"
                    >
                        아니요
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
