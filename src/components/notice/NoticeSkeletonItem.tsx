import { ArrowRight } from "lucide-react";

export const NoticeSkeletonItem = () => {
    return (
        <div className="w-full flex flex-row justify-between items-center py-10 px-[25px] animate-pulse">
            <div className="w-9 h-9 bg-gray-100 rounded-sm" />
            <div className="flex flex-col justify-between w-200 h-20">
                <div className="w-75 h-8 bg-gray-100 rounded-sm" />
                <div className="w-40 h-8 bg-gray-100 rounded-sm" />
            </div>
            <div>
                <ArrowRight className="text-gray-100" />
            </div>
        </div>
    );
};
