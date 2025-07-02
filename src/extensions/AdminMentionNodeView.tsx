import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { X } from "lucide-react";

export const AdminMentionNodeView = ({ node, getPos, editor }: NodeViewProps) => {
    const handleRemove = () => {
        const pos = getPos();
        if (typeof pos === "number") {
            editor
                .chain()
                .deleteRange({ from: pos, to: pos + node.nodeSize })
                .run();
        }
    };

    return (
        <NodeViewWrapper
            as="span"
            className="h-[30px] inline-flex items-center gap-2 px-[14px] py-2 mr-2 text-[#666666] bg-[#ECECEC] rounded-sm"
            data-id={node.attrs.id}
        >
            {node.attrs.label}
            <button type="button" onClick={handleRemove}>
                <X size={14} />
            </button>
        </NodeViewWrapper>
    );
};
