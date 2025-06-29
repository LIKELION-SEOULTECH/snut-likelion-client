import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AdminMenuBar } from "./AdminMenuBar";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import { CustomImage } from "@/extensions/customImage";
import Mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import { mentionSuggestionOptions } from "@/extensions/suggestion";

interface TextEditorProps {
    content: string;
    setContent: (text: string) => void;
}

const extensions = [
    StarterKit,
    Blockquote,
    HorizontalRule,
    Image.configure({
        allowBase64: true
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

const AdminTextEditor = ({ content, setContent }: TextEditorProps) => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "w-full min-h-[380px] px-4 py-3 rounded-sm border border-[#C4C4C4] text-sm leading-[150%] focus:outline-none"
            }
        },

        onUpdate({ editor }) {
            setContent(editor.getHTML());
            console.log(editor.getHTML());
        }
    });

    useEffect(() => {
        if (!editor) return;

        // editor 초기 렌더 이후, 외부 content와 다르면 setContent
        const currentHTML = editor.getHTML();
        const shouldUpdate = content && currentHTML !== content;

        if (shouldUpdate) {
            editor.commands.setContent(content, false);
        }
    }, [editor, content]); // ✅ 꼭 둘 다 넣어야 함

    return (
        <div className="flex flex-col">
            <AdminMenuBar editor={editor!} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default AdminTextEditor;
