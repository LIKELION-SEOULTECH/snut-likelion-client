// extensions/customMention.ts
import Mention from "@tiptap/extension-mention";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { AdminMentionNodeView } from "./AdminMentionNodeView";

export const CustomAdminMention = Mention.extend({
    addAttributes() {
        return {
            id: { default: null },
            label: { default: null },
            avatarUrl: { default: null }
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(AdminMentionNodeView);
    }
});
