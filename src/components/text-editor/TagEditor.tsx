import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { CustomMention } from "@/extensions/customMention";
import Placeholder from "@tiptap/extension-placeholder";
import { mentionSuggestionOptions } from "@/extensions/suggestion";

const extensions = [
    Document,
    Paragraph,
    Text,
    CustomMention.configure({
        suggestion: mentionSuggestionOptions
    }),

    Placeholder.configure({
        placeholder: "@함께한 사람을 태그하세요!"
    })
];

export function TagEditor({ setTags }: { setTags: (tags: string[]) => void }) {
    const editor = useEditor({
        extensions,
        content: "",
        editorProps: {
            attributes: {
                class: "w-full h-10 items-center text-xl focus:outline-none focus:border-none"
            }
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            const newTags: string[] = [];

            const extractMentions = (node: JSONContent) => {
                if (node.type === "mention" && node.attrs?.label) {
                    newTags.push(node.attrs.label);
                }
                if (node.content) {
                    node.content.forEach(extractMentions);
                }
            };

            extractMentions(json);
            setTags([...new Set(newTags)]); // 중복 제거
        }
    });

    return <EditorContent editor={editor} />;
}

export default TagEditor;
