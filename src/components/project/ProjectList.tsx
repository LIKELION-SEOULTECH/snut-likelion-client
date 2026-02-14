import { ProjectBox } from "@/components/home/ProjectBox";
import type { ProjectData } from "@/types/project";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";
import { ProjectBoxSkeleton } from "./ProjectBoxSkeleton";

export interface ProjectListProps {
    projects: ProjectData[];
    isLoading: boolean;
}

const PAGE_SIZE = 12;

export default function ProjectList({ projects, isLoading }: ProjectListProps) {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil((projects.length === 0 ? 12 : projects.length) / PAGE_SIZE)
    );

    const currentProjects = Array.isArray(projects)
        ? projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
        : [];

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mt-12 w-[1216px]">
                {isLoading || projects.length === 0
                    ? Array.from({ length: 12 }).map((_, idx) => (
                          <ProjectBoxSkeleton key={`skeleton-${idx}`} />
                      ))
                    : currentProjects.map((project) => (
                          <ProjectBox key={project.id} {...project} />
                      ))}
            </div>

            {!isLoading && projects.length > 0 && totalPages > 1 && (
                <div className="mt-8">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            )}
        </>
    );
}
