type CategoryTabsProps = {
    selected: string;
    onSelect: (category: string) => void;
    categories?: string[];
};

export default function CategoryTabs({
    selected,
    onSelect,
    categories = ["전체"]
}: CategoryTabsProps) {
    return (
        <div className="w-full flex sm:justify-center text-base sm:text-2xl sm:gap-18 text-neutral-400 mt-[45px] sm:mt-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`flex-1 sm:flex-none pb-[10px] ${
                        selected === cat
                            ? "text-white border-b-[0.87px] sm:border-b-2 border-white"
                            : ""
                    } cursor-pointer`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
