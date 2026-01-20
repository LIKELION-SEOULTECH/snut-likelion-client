import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import { CustomParagraph } from "@/extensions/customParagraph";
import Text from "@tiptap/extension-text";
import { CustomAdminMention } from "@/extensions/customAdminMention";
import Placeholder from "@tiptap/extension-placeholder";
import { mentionSuggestionOptions } from "@/extensions/suggestion";

type MentionSuggestion = {
    id: string;
    mentionLabel: string;
    avatarUrl: string;
};

const extensions = [
    Document,
    CustomParagraph,
    Text,
    CustomAdminMention.configure({
        suggestion: mentionSuggestionOptions
    }),

    Placeholder.configure({
        placeholder: "@함께한 사람을 태그하세요!"
    })
];

const tagsToContent = (tags: MentionSuggestion[]) => ({
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: tags.map((tag) => ({
                type: "mention",
                attrs: {
                    id: tag.id,
                    label: tag.mentionLabel,
                    avatarUrl: tag.avatarUrl
                }
            }))
        }
    ]
});

export function AdminTagEditor({
    tags,
    setTags
}: {
    tags: MentionSuggestion[];
    setTags: (tags: MentionSuggestion[]) => void;
}) {
    const editor = useEditor({
        extensions,
        content: tagsToContent(tags),

        editorProps: {
            attributes: {
                class: "w-full h-11 flex items-center rounded-sm text-sm border border-[#C4C4C4] px-4"
            }
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            const newTags: MentionSuggestion[] = [];
            console.log("변경된 content:", JSON.stringify(json, null, 2)); // ← 여기에서도 출력 가능

            const extractMentions = (node: JSONContent) => {
                if (
                    node.type === "mention" &&
                    node.attrs?.label &&
                    node.attrs?.id &&
                    node.attrs?.avatarUrl !== undefined
                ) {
                    newTags.push({
                        id: node.attrs.id,
                        mentionLabel: node.attrs.label,
                        avatarUrl: node.attrs.avatarUrl
                    });
                }
                if (node.content) {
                    node.content.forEach(extractMentions);
                }
            };

            extractMentions(json);
            // 중복 제거: id를 기준으로
            const uniqueTags = Array.from(new Map(newTags.map((tag) => [tag.id, tag])).values());

            setTags(uniqueTags);
        }
    });

    return <EditorContent editor={editor} />;
}

export default AdminTagEditor;
