interface SmallBtnProps {
    tag: string;
    shape: "round" | "square";
}

export const SmallBtn = ({ tag, shape }: SmallBtnProps) => {
    return (
        <button
            className={`w-auto text-[16px] px-[16px] py-4 flex items-center ${shape === "round" ? "h-[44px] rounded-[120px] text-[#FFF] bg-[#404040] " : "h-[36px] rounded-[4px] bg-[#2D2D2D] text-[#C4C4C4]"}`}
        >
            {tag}
        </button>
    );
};
