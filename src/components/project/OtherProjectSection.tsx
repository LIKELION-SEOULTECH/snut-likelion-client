import { useEffect, useRef } from "react";
import { ProjectBox } from "../home/ProjectBox";

import { ROUTES } from "@/routes/routes";
import type { ProjectData } from "@/types/project";

interface OtherProjectSectionProps {
    currentProjectId: number;
    allProjects: ProjectData[];
}

export const OtherProjectSection = ({
    currentProjectId,
    allProjects
}: OtherProjectSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    const currentProject = allProjects.find((p) => p.id === currentProjectId);
    if (!currentProject) return null;

    const sameGeneration = allProjects.filter(
        (project) =>
            project.generation === currentProject.generation && project.id !== currentProject.id
    );

    return (
        <div className="flex flex-col gap-8">
            <div className="text-[32px] font-bold leading-[130%] tracking-[-0.02]">
                같은 기수 프로젝트
            </div>
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide w-[1216px]">
                <div className="flex flex-row gap-4">
                    {sameGeneration.map((project) => (
                        <a
                            key={project.id}
                            href={`${ROUTES.PROJECT}/${project.id}`}
                            className="min-w-[395px] cursor-pointer block"
                        >
                            <ProjectBox {...project} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
