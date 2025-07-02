import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { MentionSuggestion } from "@/extensions/suggestion";

export type SuggestionListRef = {
    onKeyDown: NonNullable<
        ReturnType<NonNullable<SuggestionOptions<MentionSuggestion>["render"]>>["onKeyDown"]
    >;
};

interface MentionNodeAttrs {
    id: number | null;
    label?: string | null;
    avatarUrl?: string | null;
}

export type SuggestionListProps = SuggestionProps<MentionSuggestion>;

const SuggestionList = forwardRef<SuggestionListRef, SuggestionListProps>((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
        if (index >= props.items.length) {
            return;
        }

        const suggestion = props.items[index];

        const mentionItem: MentionNodeAttrs = {
            id: suggestion.id,
            label: suggestion.mentionLabel,
            avatarUrl: suggestion.avatarUrl
        };

        props.command(mentionItem);
    };

    const upHandler = () => {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    };

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
        selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }) => {
            if (event.key === "ArrowUp") {
                upHandler();
                return true;
            }

            if (event.key === "ArrowDown") {
                downHandler();
                return true;
            }

            if (event.key === "Enter") {
                enterHandler();
                return true;
            }

            return false;
        }
    }));

    return props.items.length > 0 ? (
        <div className="bg-white rounded-md shadow-md p-1 w-[150px] text-base max-h-[200px] overflow-y-auto">
            {props.items.map((item, index) => (
                <div
                    key={item.id}
                    className={`flex flex-row gap-3 cursor-pointer px-3 py-2 rounded ${
                        index === selectedIndex
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-100"
                    }`}
                    onClick={() => selectItem(index)}
                >
                    <img
                        src={item.avatarUrl}
                        alt={item.mentionLabel}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>@{item.mentionLabel}</span>
                </div>
            ))}
        </div>
    ) : null;
});

SuggestionList.displayName = "SuggestionList";

export default SuggestionList;
