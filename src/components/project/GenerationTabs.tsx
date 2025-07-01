type Props = {
    selected: string;
    onSelect: (generation: string) => void;
    tabs: string[];
};

export default function GenerationTabs({ selected, onSelect, tabs }: Props) {
    return (
        <div className="flex gap-7 px-[21px] py-3 font-medium">
            {tabs.map((gen) => (
                <button
                    key={gen}
                    onClick={() => onSelect(gen)}
                    className={`w-21 h-12 px-4 py-1 rounded-full text-2xl cursor-pointer ${
                        selected === gen
                            ? "bg-orange-500 text-black font-bold"
                            : "bg-neutral-600 text-black"
                    }`}
                >
                    {gen}
                </button>
            ))}
        </div>
    );
}
