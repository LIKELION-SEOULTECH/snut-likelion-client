// extensions/customImage.ts
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageComponent from "@/components/text-editor/ImageComponent";

export const CustomImage = Node.create({
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
        return [
            {
                tag: "img[src]",
                getAttrs: (dom: HTMLElement) => ({
                    src: dom.getAttribute("src"),
                    alt: dom.getAttribute("alt"),
                    isThumbnail: dom.getAttribute("data-thumbnail") === "true"
                })
            }
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const { isThumbnail, ...rest } = HTMLAttributes;
        return [
            "img",
            mergeAttributes(rest, {
                "data-thumbnail": isThumbnail ? "true" : "false"
            })
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent);
    }
});
