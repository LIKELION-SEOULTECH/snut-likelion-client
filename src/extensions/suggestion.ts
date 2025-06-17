import type { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy, { type Instance as TippyInstance } from "tippy.js";
import SuggestionList, { type SuggestionListRef } from "@/components/text-editor/SuggestionList";
import sample from "@/assets/home/sample.png";
import sample1 from "@/assets/home/sample1.png";
import sample2 from "@/assets/home/sample2.png";

export type MentionSuggestion = {
    id: string;
    mentionLabel: string;
    avatarUrl: string;
};

const DOM_RECT_FALLBACK: DOMRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON() {
        return {};
    }
};

export const mentionSuggestionOptions: MentionOptions["suggestion"] = {
    items: async ({ query }): Promise<MentionSuggestion[]> =>
        Promise.resolve(
            [
                { name: "전민경", avatarUrl: sample },
                { name: "박진아", avatarUrl: sample1 },
                { name: "이예한", avatarUrl: sample2 },
                { name: "노경인", avatarUrl: sample },
                { name: "고지완", avatarUrl: sample1 },
                { name: "박조아", avatarUrl: sample2 },
                { name: "김성휘", avatarUrl: sample },
                { name: "조한별", avatarUrl: sample1 },
                { name: "임가영", avatarUrl: sample2 }
            ]
                .map((user, index) => ({
                    mentionLabel: user.name,
                    id: index.toString(),
                    avatarUrl: user.avatarUrl
                }))
                .filter((item) => item.mentionLabel.toLowerCase().startsWith(query.toLowerCase()))
        ),

    render: () => {
        let component: ReactRenderer<SuggestionListRef> | undefined;
        let popup: TippyInstance | undefined;

        return {
            onStart: (props) => {
                component = new ReactRenderer(SuggestionList, {
                    props,
                    editor: props.editor
                });

                popup = tippy("body", {
                    getReferenceClientRect: () => props.clientRect?.() ?? DOM_RECT_FALLBACK,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start"
                })[0];
            },

            onUpdate(props) {
                component?.updateProps(props);

                popup?.setProps({
                    getReferenceClientRect: () => props.clientRect?.() ?? DOM_RECT_FALLBACK
                });
            },

            onKeyDown(props) {
                if (props.event.key === "Escape") {
                    popup?.hide();
                    return true;
                }

                if (!component?.ref) {
                    return false;
                }

                return component.ref.onKeyDown(props);
            },

            onExit() {
                popup?.destroy();
                component?.destroy();

                popup = undefined;
                component = undefined;
            }
        };
    }
};
