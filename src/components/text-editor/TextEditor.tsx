import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import { CustomImage } from "@/extensions/customImage";
import Mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import { mentionSuggestionOptions } from "@/extensions/suggestion";
import type { Dispatch, SetStateAction } from "react";

interface TextEditorProps {
    content: string;
    setContent: (text: string) => void;
    setImages: Dispatch<SetStateAction<string[]>>; // ✅ 타입 정확히 지정
}

const extensions = [
    StarterKit,
    Blockquote,
    HorizontalRule,
    Image.configure({
        allowBase64: true
    }),
    CustomImage.configure({
        onUpload: (url: string) => {
            console.log("업로드된 이미지 URL:", url);
        }
    }),
    Mention.configure({
        suggestion: mentionSuggestionOptions,
        HTMLAttributes: {
            class: "text-[#FFC08A] font-semibold"
        }
    }),

    TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left"
    })
];

const TextEditor = ({ content, setContent, setImages }: TextEditorProps) => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "w-full min-h-[200px] rounded text-xl leading-[150%] focus:outline-none focus:border-none"
            }
        },

        onUpdate({ editor }) {
            setContent(editor.getHTML());
        }
    });

    return (
        <>
            <EditorContent editor={editor} />
            <div className="mt-[77px]">
                <MenuBar editor={editor} setImages={setImages} />
            </div>
        </>
    );
};

export default TextEditor;
