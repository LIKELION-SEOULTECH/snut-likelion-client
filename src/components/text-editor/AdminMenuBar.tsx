import { Editor } from "@tiptap/react";
import AdminSubtitleBtn from "@/assets/text-editor/admin-subtitle.svg?react";
import AdminBlockQuoteBtn from "@/assets/text-editor/admin-block-quote.svg?react";
import AdminDividerBtn from "@/assets/text-editor/admin-divider.svg?react";
import AdminImageBtn from "@/assets/text-editor/admin-image.svg?react";
import { nanoid } from "nanoid";
import type { RefObject } from "react";

export const AdminMenuBar = ({
    editor,
    imageFileMap
}: {
    editor: Editor;
    imageFileMap: RefObject<Record<string, File>>;
}) => {
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        Array.from(files).forEach((file) => {
            const tempId = nanoid();
            const previewUrl = URL.createObjectURL(file);

            editor
                .chain()
                .focus()
                .insertContent([
                    {
                        type: "customImage",
                        attrs: {
                            src: previewUrl,
                            alt: file.name,
                            isThumbnail: false,
                            tempId
                        }
                    },
                    { type: "paragraph" }
                ])
                .run();

            imageFileMap.current[tempId] = file;
        });

        e.target.value = "";
    };

    return (
        <div className="relative h-11 border border-gray-100 flex flex-row rounded-sm mb-2 bg-gray-25">
            <button
                className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-gray-100]"
                aria-pressed={editor.isActive("heading", { level: 1 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <AdminSubtitleBtn />
            </button>
            <label className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-gray-100">
                <AdminImageBtn />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </label>
            <button
                className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-gray-100"
                aria-pressed={editor.isActive("horizontal")}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <AdminDividerBtn />
            </button>
            <button
                className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-gray-100"
                aria-pressed={editor.isActive("black quote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <AdminBlockQuoteBtn />
            </button>
        </div>
    );
};
