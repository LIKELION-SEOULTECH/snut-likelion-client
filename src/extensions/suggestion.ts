import type { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy, { type Instance as TippyInstance } from "tippy.js";
import SuggestionList, { type SuggestionListRef } from "@/components/text-editor/SuggestionList";

import type { MemberSearchResponse } from "@/types/member";
import { getMemberSearchList } from "@/apis/main/member";

export type MentionSuggestion = {
    id: number;
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
    items: async ({ query }): Promise<MentionSuggestion[]> => {
        try {
            const res = await getMemberSearchList({ keyword: query });
            const members = res.data.data;

            return members.map((member: MemberSearchResponse) => ({
                id: member.id,
                mentionLabel: member.name,
                avatarUrl: member.profileImageUrl
            }));
        } catch (error) {
            console.error("멤버 검색 실패:", error);
            return [];
        }
    },

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
