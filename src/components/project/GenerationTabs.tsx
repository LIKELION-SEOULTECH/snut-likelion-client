const generations = ["전체", "13기", "12기", "11기"];

type Props = {
    selected: string;
    onSelect: (generation: string) => void;
};

export default function GenerationTabs({ selected, onSelect }: Props) {
    return (
        <div className="flex gap-7 px-[21px] py-3 font-medium">
            {generations.map((gen) => (
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
