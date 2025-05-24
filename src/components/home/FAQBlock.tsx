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
            className={` bg-[#2D2D2D]  ${isOpen ? "bg-[#666666]" : ""} w-[1216px] rounded-[8px] flex justify-between text-[20px] px-[28px] py-[20px] cursor-pointer `}
            style={{ backgroundColor: tag === "A" ? "#ECECEC" : "" }}
        >
            <div className="flex ">
                <b
                    className="text-[24px] pr-3 "
                    style={{ color: tag === "A" ? "#232323" : "white" }}
                >
                    {tag}
                </b>
                <span
                    className="whitespace-pre-wrap"
                    style={{
                        color: tag === "A" ? "#2D2D2D" : "#ECECEC",
                        marginTop: tag === "A" ? "2px" : "4px"
                    }}
                >
                    {content}
                </span>
            </div>
            <img src={closedIcon} alt="icon" className={`  ${isOpen ? "rotate-180" : ""}`}></img>
        </div>
    );
};
