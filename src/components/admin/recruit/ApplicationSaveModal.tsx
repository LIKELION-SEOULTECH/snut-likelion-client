import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface ApplicationSaveModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    status: string;
}

export const ApplicationSaveModal = ({
    open,
    onClose,
    onConfirm,
    status
}: ApplicationSaveModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col justify-center w-[390px] h-[178px] p-7 rounded-[8px] gap-2 [&>button.absolute]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">합격자 저장</DialogTitle>
                </DialogHeader>

                {status === "서류 합격" ? (
                    <div className="text-center text-sm font-medium tracking-[-0.02em] leading-[140%]">
                        저장 시 서류 합격자로 확정되며, 이후에는 변경할 수 없습니다.
                    </div>
                ) : (
                    <div className="text-center text-sm font-medium tracking-[-0.02em] leading-[140%]">
                        저장 시 최종 합격자로 확정되며, 이후에는 변경할 수 없습니다.
                    </div>
                )}

                <div className="flex h-11 justify-center gap-2 mt-4">
                    <button
                        className="w-[169px] h-full text-sm border border-[#ff7700] text-black rounded-sm cursor-pointer"
                        onClick={onConfirm}
                    >
                        저장하기
                    </button>

                    <button
                        onClick={onClose}
                        className="w-[157px] h-full text-sm bg-[#FF7700] text-white rounded-sm cursor-pointer"
                    >
                        아니요
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
