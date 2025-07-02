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

export function TagEditor({ setTags }: { setTags: (tags: number[]) => void }) {
    const editor = useEditor({
        extensions,
        content: "",
        editorProps: {
            attributes: {
                class: "w-full h-10 items-center text-xl focus:outline-none focus:border-none"
            },
            handleKeyDown(view, event) {
                console.log(view);
                if (event.key === "Enter") {
                    event.preventDefault();
                    return true;
                }
                return false;
            }
        },

        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            const newTags: number[] = [];

            const extractMentions = (node: JSONContent) => {
                if (node.type === "mention" && node.attrs?.id !== undefined) {
                    const id = Number(node.attrs.id);
                    if (!isNaN(id)) {
                        newTags.push(id);
                    }
                }
                if (node.content) {
                    node.content.forEach(extractMentions);
                }
            };

            extractMentions(json);
            setTags([...new Set(newTags)]);
        }
    });

    return <EditorContent editor={editor} />;
}

export default TagEditor;
