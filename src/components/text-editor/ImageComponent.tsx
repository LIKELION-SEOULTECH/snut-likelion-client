import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";

const ImageComponent = ({ node, updateAttributes, editor }: NodeViewProps) => {
    const { src, alt, isThumbnail } = node.attrs;

    const handleClick = () => {
        editor.commands.command(({ tr, state }) => {
            state.doc.descendants((node, pos) => {
                if (node.type.name === "customImage" && node.attrs.isThumbnail) {
                    tr.setNodeMarkup(pos, undefined, {
                        ...node.attrs,
                        isThumbnail: false
                    });
                }
            });
            return true;
        });

        updateAttributes({ isThumbnail: true });
    };

    return (
        <NodeViewWrapper
            as="div"
            className={`relative my-2 group w-fit`} // group으로 hover 제어
        >
            <button
                className={`
                    absolute flex w-20 h-10 justify-center items-center text-base text-white text-center m-6 transition-opacity
                    ${isThumbnail ? "bg-[#FF7700] font-medium opacity-100" : "bg-[rgba(27,27,27,0.4)] opacity-0 group-hover:opacity-100"}
                `}
                onClick={handleClick}
            >
                썸네일
            </button>

            <img
                src={src}
                alt={alt}
                onClick={handleClick}
                onDragStart={(e) => e.preventDefault()}
                className="max-w-xs cursor-pointer transition hover:ring-2 hover:ring-[#FF7700]"
            />
        </NodeViewWrapper>
    );
};

export default ImageComponent;
