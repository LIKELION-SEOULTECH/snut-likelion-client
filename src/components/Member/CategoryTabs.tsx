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
        <div className="flex text-2xl gap-18 text-xl text-neutral-400 mt-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`pb-[10px] ${
                        selected === cat ? "text-white border-b-2 border-white" : ""
                    } cursor-pointer`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
