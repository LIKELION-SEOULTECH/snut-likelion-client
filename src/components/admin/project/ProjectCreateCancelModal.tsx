import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectCreateCancelModalProps {
    open: boolean;
    onClose: () => void; // ❌ 취소
    onConfirm: () => void; // ✅ 나가기 확정
}

export const ProjectCreateCancelModal = ({
    open,
    onClose,
    onConfirm
}: ProjectCreateCancelModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col justify-center w-[442px] h-[193px] p-7 rounded-[8px] gap-2 [&>button.absolute]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        작업을 취소하시겠습니까?
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center text-sm font-medium">
                    모든 정보가 영구적으로 삭제되며, 다시 복구할 수 없습니다.
                </div>

                <div className="flex h-11 justify-center gap-2 mt-4">
                    <button
                        className="w-[133px] h-full text-sm border border-[#ff7700] text-black rounded-sm"
                        onClick={onConfirm}
                    >
                        예
                    </button>

                    <button
                        onClick={onClose}
                        className="w-[157px] h-full text-sm bg-[#FF7700] text-white rounded-sm"
                    >
                        아니요
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
