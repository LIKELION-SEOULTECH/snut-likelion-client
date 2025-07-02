// extensions/CustomParagraph.ts
import Paragraph from "@tiptap/extension-paragraph";

export const CustomParagraph = Paragraph.extend({
    renderHTML({ HTMLAttributes }) {
        return ["span", HTMLAttributes, 0];
    }
});
