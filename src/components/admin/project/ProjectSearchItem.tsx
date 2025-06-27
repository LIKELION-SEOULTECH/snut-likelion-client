import type { Project } from "@/types/project";

interface ProjectSearchItemProps {
    project: Project;
    index: number;
    showCheckboxes: boolean;
    selected: boolean;
    onToggleSelect: (id: number) => void;
}

export const ProjectSearchItem = ({
    project,
    index,
    showCheckboxes,
    selected,
    onToggleSelect
}: ProjectSearchItemProps) => {
    return (
        <div
            className={`relative flex h-[66px] items-center font-medium ${
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            }`}
        >
            {showCheckboxes && (
                <span className="flex items-center justify-center flex-[0.3] text-center pl-4">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onToggleSelect(project.id)}
                        className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                        checked:bg-[#FF7700] checked:border-transparent 
                        checked:after:content-['✓'] checked:after:text-white 
                        checked:after:text-[16px] checked:after:block 
                        checked:after:text-center checked:after:leading-[1rem] 
                        flex items-center justify-center align-middle"
                    />
                </span>
            )}
            <span className="flex-[0.7] pl-[30px] text-left">{project.id}</span>
            <span className="flex-[4] text-left">
                <div className="flex justify-between items-center pr-14">
                    <span>{project.title}</span>
                </div>
            </span>
            <span className="flex-[0.7] text-left">{project.gen}</span>
            <span className="flex-[1] text-left">{project.type}</span>
            <span className="flex-[1.5] text-left">{project.createdAt}</span>
        </div>
    );
};
