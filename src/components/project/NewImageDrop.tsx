import type { DragEvent } from "react";
import newImgDropIcon from "@/assets/project/newImgDropIcon.png";

interface Props {
    imageFiles: File[];
    onChange: (files: File[]) => void;
}

export const NewImageDrop = ({ imageFiles, onChange }: Props) => {
    const MAX_IMAGES = 50;

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        if (imageFiles.length >= MAX_IMAGES) {
            alert("최대 50장의 이미지만 업로드할 수 있습니다.");
            return;
        }

        const newFiles: File[] = [];

        files.forEach((file) => {
            if (file.type.startsWith("image/")) {
                if (file.size > 50 * 1024 * 1024) {
                    alert("이미지 용량은 50MB 이하여야 합니다.");
                    return;
                }
                if (imageFiles.length + newFiles.length < MAX_IMAGES) {
                    newFiles.push(file);
                }
            }
        });

        onChange([...imageFiles, ...newFiles]);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemove = (index: number) => {
        const updated = imageFiles.filter((_, i) => i !== index);
        onChange(updated);
    };

    const UploadBox = ({ compact }: { compact: boolean }) => (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex-1 h-[89px] border border-[#C4C4C4] bg-white rounded-[6px] flex flex-col items-center justify-center text-[#7F7F7F] cursor-pointer"
        >
            <img src={newImgDropIcon} className="w-5 h-5 mb-1" alt="icon" />
            <p className="text-sm font-normal mb-0">
                {compact ? "사진 업로드" : "이미지를 마우스로 끌어 오세요"}
            </p>
        </div>
    );

    const getPreviewUrl = (file: File) => URL.createObjectURL(file);

    if (imageFiles.length === 0) return <UploadBox compact={false} />;

    return (
        <div className="grid grid-cols-5 gap-3 flex-1 ">
            <UploadBox compact={true} />
            {imageFiles.map((file, index) => (
                <div key={index} className="relative w-full h-[89px] rounded-[6px] overflow-hidden">
                    <img
                        src={getPreviewUrl(file)}
                        alt={`업로드된 이미지 ${index}`}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => handleRemove(index)}
                        className="absolute top-1 right-1 text-white rounded-full w-5 h-5 flex items-center justify-center text-[20px]"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};
