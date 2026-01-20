import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AdminMenuBar } from "./AdminMenuBar";

import Image from "@tiptap/extension-image";
import { CustomImage } from "@/extensions/customImage";
import Mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import { mentionSuggestionOptions } from "@/extensions/suggestion";
import { forwardRef, useImperativeHandle } from "react";
import { uploadBlogImages } from "@/apis/main/blog";
import { CustomHorizontalRule } from "@/extensions/customHorizontalRule";
import { CustomBlockQuote } from "@/extensions/customBlockQuote";

export interface AdminEditorHandle {
    getFinalHtmlAndImages: () => Promise<{
        html: string;
        imageUrls: string[];
    }>;
}

interface Props {
    content: string;
    setContent: (val: string) => void;
}

const extensions = [
    StarterKit,
    CustomBlockQuote,
    CustomHorizontalRule,
    Image.configure({
        allowBase64: false
    }),
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
    ({ content, setContent }, ref) => {
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

                const imgEls = Array.from(
                    dom.querySelectorAll<HTMLImageElement>("img[data-temp-id]")
                );

                const filesWithId = imgEls
                    .map((img) => {
                        const tempId = img.getAttribute("data-temp-id")!;
                        const file = imageFileMap.current[tempId];
                        return file ? { tempId, file, img } : null;
                    })
                    .filter(Boolean) as { tempId: string; file: File; img: HTMLImageElement }[];

                if (filesWithId.length === 0) {
                    return { html, imageUrls: [] };
                }

                // 업로드 (순서 유지)
                const urls = await uploadBlogImages(filesWithId.map((f) => f.file));

                // 정확히 매칭해서 치환
                filesWithId.forEach((item, i) => {
                    item.img.setAttribute("src", urls[i]);
                    item.img.removeAttribute("data-temp-id");
                });

                return {
                    html: dom.body.innerHTML,
                    imageUrls: urls
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
