type OrangeBtnProps = {
    tag: string;
    selected: string;
    onSelect: (tag: string) => void;
};

export const OrangeBtn = ({ tag, selected, onSelect }: OrangeBtnProps) => {
    return (
        <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={`w-21 h-12 px-4 py-1 rounded-full text-2xl cursor-pointer ${
                selected === tag
                    ? "bg-orange-500 text-black font-bold"
                    : "bg-neutral-600 text-black"
            }`}
        >
            {tag}
        </button>
    );
};
