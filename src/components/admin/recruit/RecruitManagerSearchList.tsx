import { cn } from "@/libs/cn";
import { RecruitManagerItem } from "./RecruitManagerItem";
import type { ApplicationData } from "@/types/recruitment";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import type { UpdateMode } from "@/pages/admin/AdminManagerRecruit";

export const RecruitManagerSearchList = ({
    data,
    totalElements,
    selectedIds,
    updateMode,
    pendingStatusMap,
    onToggleSelect,
    onToggleSelectAll
}: {
    data: ApplicationData[];
    totalElements: number;
    selectedIds: number[];
    updateMode: UpdateMode;
    pendingStatusMap: Record<number, "SUBMITTED" | "PAPER_PASS" | "FINAL_PASS" | "FAILED">;
    onToggleSelect: (app: ApplicationData) => void;
    onToggleSelectAll: () => void;
}) => {
    const { isManageMode } = useRecruitManageStore();
    const pageIds = data.map((app) => app.id);
    const isAllChecked = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

    return (
        <div>
            <div className="flex flex-row regular-14 gap-7 mb-8">
                <div>
                    전체 <span className="text-orange-400">{totalElements}</span>
                </div>
                <div>
                    합격 <span className="text-orange-400">{data.length}</span>
                </div>
            </div>
            <div className="w-full text-sm rounded-sm overflow-hidden min-h-[527px] bg-white">
                {/* 리스트 헤더 */}
                <div
                    className={cn(
                        "grid h-10 items-center text-[#666666] font-medium bg-[#FAFAFA] px-6",
                        isManageMode
                            ? "grid-cols-[72px_86px_108px_1fr_95px_103px_146px_58px]"
                            : "grid-cols-[118px_140px_1fr_95px_103px_146px_58px]"
                    )}
                >
                    {isManageMode && (
                        <span className="flex items-center justify-start text-center">
                            <input
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={onToggleSelectAll}
                                className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                                checked:bg-[#FF7700] checked:border-transparent 
                                checked:after:content-['✓'] checked:after:text-white 
                                checked:after:text-[16px] checked:after:block 
                                checked:after:text-center checked:after:leading-[1rem] 
                                flex items-center justify-center align-middle"
                            />
                        </span>
                    )}
                    <span className={cn(isManageMode ? "pl-[6px]" : "pl-0")}>No</span>
                    <span>이름</span>
                    <span className="min-w-50">이메일</span>
                    <span>부서</span>
                    <span>파트</span>
                    <span>지원날짜</span>
                    <span>결과</span>
                </div>
                {/* 리스트 content */}
                <div>
                    {data.map((app, index) => (
                        <RecruitManagerItem
                            key={app.id}
                            app={app}
                            index={index}
                            updateMode={updateMode}
                            pendingStatus={pendingStatusMap[app.id]}
                            checked={selectedIds.includes(app.id)}
                            onToggle={() => onToggleSelect(app)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
