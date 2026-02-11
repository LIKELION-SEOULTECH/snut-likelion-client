import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface QuestionSaveModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const QuestionSaveModal = ({ open, onClose, onConfirm }: QuestionSaveModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col justify-center w-[442px] h-[193px] px-[54px] py-[35.5px] rounded-[8px] gap-2 [&>button.absolute]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        결과를 저장하시겠습니까?
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center text-sm font-medium tracking-[-0.02em] leading-[140%]">
                    저장 시 최종 결과로 확정됩니다.
                </div>

                <div className="flex h-[42px] justify-center gap-2 mt-4">
                    <button
                        className="w-[169px] h-full text-sm border border-primary-500 text-black rounded-sm cursor-pointer hover:bg-gray-50"
                        onClick={onConfirm}
                    >
                        저장하기
                    </button>

                    <button
                        onClick={onClose}
                        className="w-[157px] h-full text-sm bg-primary-500 text-white rounded-sm cursor-pointer hover:bg-primary-400"
                    >
                        아니요
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
