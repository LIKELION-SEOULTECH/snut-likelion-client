import Blockquote from "@tiptap/extension-blockquote";

export const CustomBlockQuote = Blockquote.extend({
    renderHTML({ HTMLAttributes }) {
        return [
            "blockquote",
            {
                ...HTMLAttributes,
                class: "border-l-4 border-gray-900 pl-4 my-4"
            },
            0
        ];
    }
});
