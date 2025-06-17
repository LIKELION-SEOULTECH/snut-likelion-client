import { ProjectReminderBox } from "./ProjectReminderBox";

export const ProjectReminderSection = () => {
    return (
        <div className="flex flex-col gap-8">
            <div
                className="font-bold text-[32px] leading-[130%] tracking-[-0.02em]
"
            >
                프로젝트 회고
            </div>
            <div className="grid grid-cols-2 gap-4 w-[1216px]">
                <ProjectReminderBox />
                <ProjectReminderBox />
                <ProjectReminderBox />
            </div>
        </div>
    );
};
