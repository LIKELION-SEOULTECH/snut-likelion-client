import { Editor } from "@tiptap/react";
import SubtitleBtn from "@/assets/text-editor/subtitle.svg?react";
import BlockQuoteBtn from "@/assets/text-editor/block-quote.svg?react";
import DividerBtn from "@/assets/text-editor/divider.svg?react";
import ImageBtn from "@/assets/text-editor/image.svg?react";
import OpenBtn from "@/assets/text-editor/open-btn.svg?react";
import CloseBtn from "@/assets/text-editor/close-btn.svg?react";
import { useState } from "react";
import { uploadBlogImages } from "@/apis/blog";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!editor) {
        return null;
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const urls = await uploadBlogImages([file]); // ✅ 서버에 업로드
            const imageUrl = urls[0];

            editor
                .chain()
                .focus("end")
                .insertContent({
                    type: "customImage",
                    attrs: {
                        src: imageUrl,
                        alt: "uploaded image",
                        isThumbnail: false
                    }
                })
                .run();
        } catch (err) {
            console.error("이미지 업로드 실패", err);
        } finally {
            e.target.value = ""; // 같은 파일 업로드 다시 허용
        }
    };

    return (
        <div className="relative h-11 flex flex-row gap-4">
            <button
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? <CloseBtn /> : <OpenBtn />}
            </button>
            {isOpen ? (
                <>
                    <button
                        className="h-4 cursor-pointer"
                        aria-pressed={editor.isActive("heading", { level: 1 })}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    >
                        <SubtitleBtn />
                    </button>
                    <button
                        className="h-4 cursor-pointer"
                        aria-pressed={editor.isActive("black quote")}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    >
                        <BlockQuoteBtn />
                    </button>
                    <button
                        className="h-4 cursor-pointer"
                        aria-pressed={editor.isActive("horizontal")}
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    >
                        <DividerBtn />
                    </button>
                    <label className="cursor-pointer">
                        <ImageBtn />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </>
            ) : (
                <div className="w-[2px] h-5 bg-[#FF7700] self-center" />
            )}
        </div>
    );
};
