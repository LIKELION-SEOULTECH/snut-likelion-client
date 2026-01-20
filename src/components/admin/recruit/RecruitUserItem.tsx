import { useNavigate } from "react-router-dom";
import type { ApplicationData } from "@/types/recruitment";
import { cn } from "@/libs/cn";
import { formatDateWithHyphen } from "@/utils/formatData";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
interface RecruitManagerItemProps {
    app: ApplicationData;
    index: number;
    checked: boolean;
    onToggle: () => void;
}

export const RecruitUserItem = ({ app, index, checked, onToggle }: RecruitManagerItemProps) => {
    const navigate = useNavigate();
    const { isManageMode } = useRecruitManageStore();

    return (
        <div
            onClick={() => navigate(`/admin/recruit/result/user/${app.id}`)}
            className={cn(
                "grid grid-cols-[60px_100px_1fr_120px_120px_100px] h-[66px] items-center font-medium px-6 cursor-pointer",
                isManageMode
                    ? "grid-cols-[72px_86px_108px_1fr_110px_146px_82px]"
                    : "grid-cols-[60px_100px_1fr_120px_120px_100px]",
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            )}
        >
            {isManageMode && (
                <span className="flex items-center justify-start text-center">
                    <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        checked={checked}
                        onChange={onToggle}
                        className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                                checked:bg-[#FF7700] checked:border-transparent 
                                checked:after:content-['✓'] checked:after:text-white 
                                checked:after:text-[16px] checked:after:block 
                                checked:after:text-center checked:after:leading-[1rem] 
                                flex items-center justify-center align-middle"
                    />
                </span>
            )}
            <span>{app.id}</span>
            <span>{app.username}</span>
            {/* <span>{member.email}</span> */}
            <span>test@gmail.com</span>
            <span>{app.part}</span>
            <span>{formatDateWithHyphen(app.submittedAt)}</span>
            <span className="px-[9px]">{app.status}</span>
        </div>
    );
};
