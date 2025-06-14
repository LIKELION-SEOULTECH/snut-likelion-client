import ArrowRight from "@/assets/news/arrow-right.svg?react";
import { useNavigate } from "react-router-dom";
interface NewsCardProps {
    id: number;
    type: string;
    title: string;
    date: string;
    isNew: boolean;
}

export const NewsCardItem = ({ id, type, title, date, isNew }: NewsCardProps) => {
    const typeColor = type === "공지" ? "#FF7700" : "#A7A7A7";

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/news-content/${id}`);
    };

    return (
        <div
            className="w-full flex flex-row cursor-pointer border-b border-[#2D2D2D] py-10 justify-between"
            onClick={handleClick}
        >
            <div className="flex flex-row">
                <div
                    className="h-full flex font-bold text-2xl leading-[150%] pr-[163px] items-center"
                    style={{ color: typeColor }}
                >
                    {type}
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 text-2xl leading-[150%] font-medium">
                        {title}
                        {isNew && (
                            <>
                                <div className="w-14 h-[26px] flex items-center rounded-sm text-white text-sm font-medium bg-[#FF9233] text-center px-3 py-[6px]">
                                    NEW
                                </div>
                            </>
                        )}
                    </div>
                    <div className="text-xl font-light leading-[150%]">{date}</div>
                </div>
            </div>
            <div className="flex items-center">
                <ArrowRight />
            </div>
        </div>
    );
};
