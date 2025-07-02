// extensions/customImage.ts
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import NoticeImageComponent from "@/components/text-editor/NoticeImageComponent";

export const NoticeCustomImage = Node.create({
    name: "customImage",
    group: "block",
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            src: { default: null },
            alt: { default: null },
            isThumbnail: { default: false }
        };
    },

    parseHTML() {
        return [{ tag: "img[src]" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["img", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(NoticeImageComponent);
    }
});
