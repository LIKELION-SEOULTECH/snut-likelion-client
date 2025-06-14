// extensions/customMention.ts
import Mention from "@tiptap/extension-mention";

export const CustomMention = Mention.extend({
    addAttributes() {
        return {
            id: { default: null },
            label: { default: null },
            avatarUrl: { default: null }
        };
    },

    renderHTML({ node }) {
        return [
            "span",
            {
                class: "h-10 inline-flex items-center gap-2 px-4 py-[10px] mr-3 mb-3 text-[#666666] bg-[#ECECEC] rounded-sm",
                "data-id": node.attrs.id
            },
            [
                "img",
                {
                    src: node.attrs.avatarUrl,
                    class: "w-5 h-5 rounded-full object-cover"
                }
            ],
            `${node.attrs.label}`
        ];
    }
});
