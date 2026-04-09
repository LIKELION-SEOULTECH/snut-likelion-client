import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AdminMenuBar } from "./AdminMenuBar";

// import Image from "@tiptap/extension-image";
import { CustomImage } from "@/extensions/customImage";
import Mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import { mentionSuggestionOptions } from "@/extensions/suggestion";
import { forwardRef, useImperativeHandle } from "react";
import { CustomHorizontalRule } from "@/extensions/customHorizontalRule";
import { CustomBlockQuote } from "@/extensions/customBlockQuote";
import { uploadImages } from "@/apis/main/file";

export interface AdminEditorHandle {
    getFinalHtmlAndImages: () => Promise<{
        html: string;
        imageUrls: string[];
    }>;
}

type UploadCategory = "BLOG" | "NOTICE" | "PROJECT" | "MEMBER";

interface Props {
    content: string;
    setContent: (val: string) => void;
    uploadCategory: UploadCategory;
}

const extensions = [
    StarterKit,
    CustomBlockQuote,
    CustomHorizontalRule,

    CustomImage,

    Mention.configure({
        suggestion: mentionSuggestionOptions,
        HTMLAttributes: {
            class: "text-[#FFC08A] font-semibold"
        }
    }),

    TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        defaultAlignment: "left"
    })
];

const AdminTextEditor = forwardRef<AdminEditorHandle | null, Props>(
    ({ content, setContent, uploadCategory }, ref) => {
        const imageFileMap = useRef<Record<string, File>>({});

        const editor = useEditor({
            extensions,
            content,
            editorProps: {
                attributes: {
                    class: "w-full min-h-[380px] px-4 py-3 rounded-sm border border-gray-100 text-sm leading-[150%] focus:outline-none"
                }
            },

            onUpdate({ editor }) {
                setContent(editor.getHTML());
            }
        });

        useImperativeHandle(ref, () => ({
            async getFinalHtmlAndImages() {
                if (!editor) throw new Error("Editor not ready");

                const html = editor.getHTML();
                const dom = new DOMParser().parseFromString(html, "text/html");

                const imgEls = Array.from(dom.querySelectorAll<HTMLImageElement>("img"));

                const newImages: { tempId: string; file: File; img: HTMLImageElement }[] = [];
                const existingImages: string[] = [];

                imgEls.forEach((img) => {
                    const tempId = img.getAttribute("data-temp-id");

                    if (tempId) {
                        const file = imageFileMap.current[tempId];
                        if (file) {
                            newImages.push({ tempId, file, img });
                        }
                    } else {
                        const src = img.getAttribute("src");
                        if (src) {
                            try {
                                const url = new URL(src);
                                const key = url.pathname.replace(/^\//, "");
                                existingImages.push(key);
                            } catch {
                                console.warn("잘못된 이미지 URL:", src);
                            }
                        }
                    }
                });

                let newStoredNames: string[] = [];
                let fileUrls: string[] = [];

                if (newImages.length > 0) {
                    const result = await uploadImages(
                        newImages.map((f) => f.file),
                        uploadCategory,
                        "IMAGE"
                    );

                    newStoredNames = result.storedNames;
                    fileUrls = result.fileUrls;

                    newImages.forEach((item, i) => {
                        item.img.setAttribute("src", fileUrls[i]);
                        item.img.removeAttribute("data-temp-id");
                    });
                }

                return {
                    html: dom.body.innerHTML,
                    imageUrls: [...existingImages, ...newStoredNames] // 🔥 핵심
                };
            }
        }));

        useEffect(() => {
            if (editor && content !== editor.getHTML()) {
                editor.commands.setContent(content, false);
            }
        }, [content, editor]);
        if (!editor) return;

        return (
            <div className="flex flex-col">
                <AdminMenuBar editor={editor!} imageFileMap={imageFileMap} />
                <EditorContent editor={editor} />
            </div>
        );
    }
);

export default AdminTextEditor;
