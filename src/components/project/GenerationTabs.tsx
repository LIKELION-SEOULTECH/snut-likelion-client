type Props = {
    selected: string;
    onSelect: (generation: string) => void;
    tabs: string[];
};

export default function GenerationTabs({ selected, onSelect, tabs }: Props) {
    return (
        <div className="flex gap-5 sm:gap-7 px-[21px] py-3 font-medium">
            {tabs.map((gen) => (
                <button
                    key={gen}
                    onClick={() => onSelect(gen)}
                    className={`h-[33.5px] sm:h-12 px-[15.31px] sm:px-[21px] rounded-full text-base sm:text-2xl cursor-pointer whitespace-nowrap ${
                        selected === gen
                            ? "bg-orange-500 text-black font-semibold sm:font-bold"
                            : "bg-neutral-600 text-black"
                    }`}
                >
                    {gen}
                </button>
            ))}
        </div>
    );
}
