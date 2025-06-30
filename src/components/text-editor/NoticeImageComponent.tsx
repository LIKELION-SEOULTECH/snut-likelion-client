import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";

const NoticeImageComponent = ({ node }: NodeViewProps) => {
    const { src, alt } = node.attrs;

    return (
        <NodeViewWrapper as="div" className="relative my-2 w-fit">
            <img
                src={src}
                alt={alt}
                onDragStart={(e) => e.preventDefault()}
                className="max-w-xs cursor-pointer transition hover:ring-2 hover:ring-[#FF7700]"
            />
        </NodeViewWrapper>
    );
};

export default NoticeImageComponent;
