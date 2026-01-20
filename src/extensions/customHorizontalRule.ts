import { HorizontalRule } from "@tiptap/extension-horizontal-rule";

export const CustomHorizontalRule = HorizontalRule.extend({
    renderHTML() {
        return [
            "hr",
            {
                class: "w-[190px] max-w-full border-t border-gray-300 my-6"
            }
        ];
    }
});
