import { useRef, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import ImageUploadIcon from "@/assets/admin/image-upload.svg?react";
import { X } from "lucide-react";

interface ImageItem {
    id: string;
    url: string;
    file: File;
}

interface ImageUploadProps {
    onImagesChange: (files: File[]) => void;
    initialUrls?: string[]; // 추가
}

export const ImageUpload = ({ onImagesChange, initialUrls = [] }: ImageUploadProps) => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (initialUrls.length > 0) {
            const initialImageItems: ImageItem[] = initialUrls.map((url) => ({
                id: crypto.randomUUID(),
                url,
                file: new File([], "existing-image-from-server", { type: "image/*" }) // dummy File
            }));

            setImages(initialImageItems);
            onImagesChange(initialImageItems.map((img) => img.file));
        }
    }, [initialUrls, onImagesChange]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages: ImageItem[] = Array.from(files).map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file
        }));

        const updated = [...images, ...newImages];
        setImages(updated);
        onImagesChange(updated.map((img) => img.file));

        e.target.value = ""; // 재업로드 허용
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reordered = [...images];
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        setImages(reordered);
    };

    const handleRemove = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    return (
        <div className="flex-1">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                multiple
            />
            {images.length === 0 ? (
                <div
                    className="flex flex-col items-center justify-center h-[89px] border border-[#C4C4C4] rounded-sm cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                >
                    <ImageUploadIcon />
                    <div className="text-[#7F7F7F] text-sm mt-2">이미지를 마우스로 끌어 오세요</div>
                </div>
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="image-list" direction="horizontal">
                        {(provided) => (
                            <div
                                className="flex flex-wrap gap-2"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {/* 업로드 버튼 */}
                                <div
                                    className="w-[140px] h-[89px] border border-[#C4C4C4] rounded-sm flex flex-col items-center justify-center cursor-pointer gap-2"
                                    onClick={() => inputRef.current?.click()}
                                >
                                    <ImageUploadIcon />
                                    <span className="text-[#7F7F7F] text-sm">이미지 첨부</span>
                                </div>

                                {/* 이미지 리스트 */}
                                {images.map((image, index) => (
                                    <Draggable key={image.id} draggableId={image.id} index={index}>
                                        {(provided) => (
                                            <div
                                                className="relative w-[140px] h-[89px] rounded-sm overflow-hidden"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <img
                                                    src={image.url}
                                                    alt="preview"
                                                    className="object-cover w-full h-full"
                                                />
                                                <button
                                                    className="absolute top-1 right-1 text-white p-0"
                                                    style={{ background: "rgba(0, 0, 0, 0.5)" }}
                                                    onClick={() => handleRemove(image.id)}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};
