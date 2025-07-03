const blogTypes = ["세션 이야기", "프로젝트 회고"] as const;

type BlogType = (typeof blogTypes)[number] | "세션 이야기";

type Props = {
    selected: BlogType;
    onSelect: (type: BlogType) => void;
};

export default function BlogTypeTabs({ selected, onSelect }: Props) {
    return (
        <div className="w-full flex gap-7 items-center justify-center font-medium">
            {blogTypes.map((type) => (
                <button
                    key={type}
                    onClick={() => onSelect(type)}
                    className={`flex h-12 px-[21px] py-3 rounded-full text-2xl cursor-pointer whitespace-nowrap items-center ${
                        selected === type
                            ? "bg-orange-500 text-white font-bold"
                            : "bg-[#ECECEC] text-[#A7A7A7]"
                    }`}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}
