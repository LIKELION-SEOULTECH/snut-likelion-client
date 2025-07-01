import closedIcon from "../../assets/home/Vector.svg";

interface FAQBlockProps {
    tag: "Q" | "A";
    content: string;
    isOpen?: boolean;
    onClick?: () => void;
}

export const FAQBlock = ({ tag, content, isOpen = false, onClick }: FAQBlockProps) => {
    return (
        <div
            onClick={onClick}
            className={` bg-[#2D2D2D]  ${isOpen ? "bg-[#666666]" : ""} w-[343px] sm:w-[1216px] rounded-[8px] flex justify-between items-center text-sm sm:text-[20px] px-3 sm:px-[28px] py-2 sm:py-[20px] cursor-pointer `}
            style={{ backgroundColor: tag === "A" ? "#ECECEC" : "" }}
        >
            <div className="flex ">
                <b
                    className="text-sm sm:text-[24px] pr-1 sm:pr-3 "
                    style={{ color: tag === "A" ? "#232323" : "white" }}
                >
                    {tag}
                </b>
                <span
                    className={`whitespace-pre-wrap ${
                        tag === "A"
                            ? "text-[#2D2D2D] mt-0 sm:mt-[2px]"
                            : "text-[#ECECEC] mt-0 sm:mt-[4px]"
                    }`}
                >
                    {content}
                </span>
            </div>
            <img
                src={closedIcon}
                alt="icon"
                className={`w-3 sm:w-5 h-3 sm:h-5 ${isOpen ? "rotate-180" : ""}`}
            ></img>
        </div>
    );
};
