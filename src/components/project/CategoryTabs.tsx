const categories = ["전체", "아이디어톤", "해커톤", "데모데이"];

type Props = {
    selected: string;
    onSelect: (category: string) => void;
};

export default function CategoryTabs({ selected, onSelect }: Props) {
    return (
        <div className="w-full sm:w-auto flex text-base sm:text-2xl gap-[14px] sm:gap-18 text-neutral-400 mt-[45px] sm:mt-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`flex-1 pb-[10px] ${
                        selected === cat
                            ? "text-white border-b-[0.87px] sm:border-b-2 border-white"
                            : ""
                    } cursor-pointer whitespace-nowrap`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
