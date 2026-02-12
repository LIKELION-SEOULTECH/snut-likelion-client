import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    description?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

export const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmButtonText = "확인",
    cancelButtonText
}: ConfirmationModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col justify-center w-auto min-w-[354px] h-[180px] px-[28px] py-[28px] rounded-[8px] [&>button.absolute]:hidden">
                <DialogHeader>
                    <DialogTitle
                        className={`text-[20px] font-semibold text-center ${description ? "font-bold" : "font-semibold"}`}
                    >
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-center text-sm font-medium tracking-[-0.02em] leading-[140%] text-black ">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div
                    className={`flex h-[42px] justify-center gap-2 w-full ${!description ? "mt-3" : "mt-1"}`}
                >
                    {onConfirm && (
                        <Button
                            className={`flex-1 h-full text-sm border border-primary-500 text-black rounded-sm cursor-pointer  ${cancelButtonText === undefined ? "bg-[#f70] hover:bg-[#f70] " : "bg-white hover:bg-white"}`}
                            onClick={onConfirm}
                        >
                            {confirmButtonText}
                        </Button>
                    )}

                    {cancelButtonText && (
                        <Button
                            onClick={onClose}
                            className="flex-1 h-full text-sm bg-primary-500 text-white rounded-sm cursor-pointer hover:bg-[#f70]"
                        >
                            {cancelButtonText}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
