import type { DragEvent, ChangeEvent } from "react";
import { useRef } from "react";
import newImgDropIcon from "@/assets/project/newImgDropIcon.png";
import { toPublicFileUrl } from "@/utils/file";

interface Props {
    imageFiles: File[];
    onChange: (files: File[]) => void;
    existingImageUrls?: string[];
    onExistingImagesChange?: (urls: string[]) => void;
}

export const NewImageDrop = ({
    imageFiles,
    onChange,
    existingImageUrls = [],
    onExistingImagesChange
}: Props) => {
    const MAX_IMAGES = 50;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageCount = existingImageUrls.length + imageFiles.length;

    const processFiles = (files: FileList | File[]) => {
        if (imageCount >= MAX_IMAGES) {
            alert("최대 50장의 이미지만 업로드할 수 있습니다.");
            return;
        }

        const newFiles: File[] = [];

        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                if (file.size > 50 * 1024 * 1024) {
                    alert("이미지 용량은 50MB 이하여야 합니다.");
                    return;
                }
                if (imageCount + newFiles.length < MAX_IMAGES) {
                    newFiles.push(file);
                }
            } else {
                alert("이미지 파일만 업로드할 수 있습니다.");
            }
        });

        onChange([...imageFiles, ...newFiles]);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        processFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemove = (index: number) => {
        const updated = imageFiles.filter((_, i) => i !== index);
        onChange(updated);
    };

    const handleRemoveExisting = (index: number) => {
        if (!onExistingImagesChange) return;
        const updated = existingImageUrls.filter((_, i) => i !== index);
        onExistingImagesChange(updated);
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFiles(e.target.files);
            e.target.value = "";
        }
    };

    const UploadBox = ({ compact }: { compact: boolean }) => (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleFileInputClick}
            className="flex-1 h-[89px] border border-[#C4C4C4] bg-white rounded-[6px] flex flex-col items-center justify-center text-[#7F7F7F] cursor-pointer"
        >
            <img src={newImgDropIcon} className="w-5 h-5 mb-1" alt="icon" />
            <p className="text-sm font-normal mb-0">
                {compact ? "사진 업로드" : "이미지를 마우스로 끌어 오거나 클릭하세요"}
            </p>
            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </div>
    );

    const getPreviewUrl = (file: File) => URL.createObjectURL(file);

    if (imageCount === 0) return <UploadBox compact={false} />;

    return (
        <div className="grid grid-cols-5 gap-3 flex-1 ">
            <UploadBox compact={true} />
            {existingImageUrls.map((url, index) => (
                <div key={url} className="relative w-full h-[89px] rounded-[6px] overflow-hidden">
                    <img
                        src={toPublicFileUrl(url)}
                        alt={`기존 이미지 ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveExisting(index)}
                        className="absolute top-1 right-1 text-white rounded-full w-5 h-5 flex items-center justify-center text-[20px]"
                    >
                        ×
                    </button>
                </div>
            ))}
            {imageFiles.map((file, index) => (
                <div key={index} className="relative w-full h-[89px] rounded-[6px] overflow-hidden">
                    <img
                        src={getPreviewUrl(file)}
                        alt={`업로드된 이미지 ${index}`}
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
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
