import type { Project } from "@/types/project";
import { ProjectSearchItem } from "./ProjectSearchItem";
interface ProjectSearchListProps {
    data: Project[];
    showCheckboxes: boolean;
    selectedIds: number[];
    onToggleSelect: (id: number) => void;
    onToggleSelectAll?: (checked: boolean) => void;
    length: number;
}

export const ProjectSearchList = ({
    data,
    showCheckboxes,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
    length
}: ProjectSearchListProps) => {
    return (
        <div>
            <div className="text-sm mb-4">
                검색결과 <span className="text-orange-400">{length}</span>
            </div>

            <div className="w-full text-sm rounded-sm overflow-hidden bg-white min-h-[567px]">
                {/* 리스트 헤더 */}
                <div className="h-10 flex items-center text-[#666666] font-medium bg-[#FAFAFA]">
                    {showCheckboxes && (
                        <span className="flex items-center justify-center flex-[0.3] text-center pl-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                                checked:bg-[#FF7700] checked:border-transparent 
                                checked:after:content-['✓'] checked:after:text-white 
                                checked:after:text-[16px] checked:after:block 
                                checked:after:text-center checked:after:leading-[1rem] 
                                flex items-center justify-center align-middle"
                                checked={data.length > 0 && selectedIds.length === data.length}
                                onChange={(e) => onToggleSelectAll?.(e.target.checked)}
                            />
                        </span>
                    )}

                    <span className="flex-[0.7] text-left pl-6 pr-[6px]">No</span>
                    <span className="flex-[4] text-left">제목</span>
                    <span className="flex-[0.7] text-left">기수</span>
                    <span className="flex-[1] text-left">구분</span>
                    <span className="flex-[1] text-left">등록일</span>
                </div>

                {/* 리스트 content */}
                <div>
                    {data.map((project, index) => (
                        <ProjectSearchItem
                            key={project.id}
                            project={project}
                            index={index}
                            showCheckboxes={showCheckboxes}
                            selected={selectedIds.includes(project.id)}
                            onToggleSelect={onToggleSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
