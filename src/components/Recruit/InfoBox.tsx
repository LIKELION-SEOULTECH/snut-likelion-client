import type { ReactNode } from "react";

type InfoBoxProps = {
    text: ReactNode;
    note?: string;
    centered?: boolean;
};
export const InfoBox = ({ text, note, centered }: InfoBoxProps) => {
    const bgColor = note ? "bg-[#ECECEC]" : "bg-[#666]";
    const noteText = note ? "text-[#2D2D2D] justify-between" : "text-[#ECECEC]";
    const textAlign = centered ? "text-center justify-center" : "text-left";

    return (
        <div
            className={`py-[23px] font-medium px-[28px] h-auto rounded-[8px] text-[20px] flex ${bgColor} ${noteText} ${textAlign} flex-1`}
        >
            <span className="text-[20px] ">{text}</span>
            {note && <span className=" text-[#666]">{note}</span>}
        </div>
    );
};
