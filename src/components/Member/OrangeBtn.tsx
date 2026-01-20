type OrangeBtnProps = {
    tag: string;
    selected?: string;
    onSelect?: (tag: string) => void;
    isNotButton?: boolean;
};

export const OrangeBtn = ({ tag, selected, onSelect, isNotButton }: OrangeBtnProps) => {
    return (
        <button
            key={tag}
            onClick={() => {
                if (!isNotButton && onSelect) onSelect(tag);
            }}
            className={`w-auto h-12 px-4 py-1 rounded-full text-2xl cursor-pointer ${
                selected === tag || isNotButton
                    ? "bg-orange-500 text-black font-bold"
                    : "bg-neutral-600 text-[#1b1b1b]"
            } `}
        >
            {tag}
        </button>
    );
};
