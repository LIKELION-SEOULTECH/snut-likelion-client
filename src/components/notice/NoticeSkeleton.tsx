import { Separator } from "../ui/separator";
import { NoticeSkeletonItem } from "./NoticeSkeletonItem";

export const NoticeSkeleton = () => {
    return (
        <div className="w-full border-y-2 border-gray-700">
            <NoticeSkeletonItem />
            <Separator className="bg-gray-200" />
            <NoticeSkeletonItem />
            <Separator className="bg-gray-200" />
            <NoticeSkeletonItem />
        </div>
    );
};
