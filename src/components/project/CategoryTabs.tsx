const categories = ["전체", "아이디어톤", "해커톤", "데모데이", "장기 프로젝트"];

type Props = {
    selected: string;
    onSelect: (category: string) => void;
};

export default function CategoryTabs({ selected, onSelect }: Props) {
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
