import { Editor } from "@tiptap/react";
import AdminSubtitleBtn from "@/assets/text-editor/admin-subtitle.svg?react";
import AdminBlockQuoteBtn from "@/assets/text-editor/admin-block-quote.svg?react";
import AdminDividerBtn from "@/assets/text-editor/admin-divider.svg?react";
import AdminImageBtn from "@/assets/text-editor/admin-image.svg?react";

export const AdminMenuBar = ({ editor }: { editor: Editor }) => {
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
        <div className="relative h-11 border border-[#C4C4C4] flex flex-row rounded-sm mb-2 bg-[#F5F5F5]">
            <button
                className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-[#C4C4C4]"
                aria-pressed={editor.isActive("heading", { level: 1 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <AdminSubtitleBtn />
            </button>
            <button
                className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-[#C4C4C4]"
                aria-pressed={editor.isActive("black quote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <AdminBlockQuoteBtn />
            </button>
            <button
                className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-[#C4C4C4]"
                aria-pressed={editor.isActive("horizontal")}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <AdminDividerBtn />
            </button>
            <label className="h-11 w-10 flex items-center justify-center cursor-pointer border-r border-[#C4C4C4]">
                <AdminImageBtn />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </label>
        </div>
    );
};
