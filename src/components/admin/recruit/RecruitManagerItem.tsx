import { useNavigate } from "react-router-dom";
import type { ApplicationData } from "@/types/recruitment";
import { cn } from "@/libs/cn";
import { formatDateWithHyphen } from "@/utils/formatData";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import type { UpdateMode } from "@/pages/admin/AdminManagerRecruit";
import { getApplicationStatusLabel } from "@/utils/getApplicationStatusLabel";

interface RecruitManagerItemProps {
    app: ApplicationData;
    index: number;
    checked: boolean;
    updateMode: UpdateMode;
    pendingStatus?: "SUBMITTED" | "PAPER_PASS" | "FINAL_PASS" | "FAILED";
    onToggle: () => void;
}

export const RecruitManagerItem = ({
    app,
    index,
    checked,
    updateMode,
    pendingStatus,
    onToggle
}: RecruitManagerItemProps) => {
    const navigate = useNavigate();
    const { isManageMode } = useRecruitManageStore();

    console.log(app.status);
    return (
        <div
            onClick={() => navigate(`/admin/recruit/result/manager/${app.id}`)}
            className={cn(
                "grid grid-cols-[60px_100px_1fr_120px_120px_100px] h-[66px] items-center font-medium px-6 cursor-pointer",
                isManageMode
                    ? "grid-cols-[72px_86px_108px_1fr_95px_103px_146px_58px]"
                    : "grid-cols-[118px_140px_1fr_95px_103px_146px_58px]",
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            )}
        >
            {isManageMode && (
                <span className="flex items-center justify-start text-center">
                    <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        checked={checked}
                        disabled={
                            (updateMode === "제출" && app.status !== "제출") ||
                            (updateMode === "서류 합격" && app.status !== "서류 합격")
                        }
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
            <span className="pl-[6px]">{app.id}</span>
            <span>{app.username}</span>
            <span>{app.email}</span>
            <span>{app.departmentType}</span>
            <span>{app.part}</span>
            <span>{formatDateWithHyphen(app.submittedAt)}</span>
            <span>{getApplicationStatusLabel(pendingStatus ?? app.status)}</span>
        </div>
    );
};
