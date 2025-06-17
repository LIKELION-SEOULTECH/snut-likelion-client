import { Editor } from "@tiptap/react";
import SubtitleBtn from "@/assets/text-editor/subtitle.svg?react";
import BlockQuoteBtn from "@/assets/text-editor/block-quote.svg?react";
import DividerBtn from "@/assets/text-editor/divider.svg?react";
import ImageBtn from "@/assets/text-editor/image.svg?react";
import OpenBtn from "@/assets/text-editor/open-btn.svg?react";
import CloseBtn from "@/assets/text-editor/close-btn.svg?react";
import { useState } from "react";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!editor) {
        return null;
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result as string;
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
        };
        reader.readAsDataURL(file);
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
