import { useEffect, useState } from "react";
import { ProjectBox } from "@/components/home/ProjectBox";
import type { ProjectData } from "@/types/project";

const LOAD_COUNT = 6;

interface ProjectListProps {
    projects: ProjectData[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);
    const [isLoading, setIsLoading] = useState(false);

    const visibleProjects = projects.slice(0, visibleCount);

    useEffect(() => {
        setVisibleCount(LOAD_COUNT);
    }, [projects]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                visibleCount < projects.length &&
                !isLoading
            ) {
                setIsLoading(true);
                setTimeout(() => {
                    setVisibleCount((prev) => prev + LOAD_COUNT);
                    setIsLoading(false);
                }, 500);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleCount, projects.length, isLoading]);

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mt-12 w-[1216px]">
                {visibleProjects.map((project) => (
                    <ProjectBox key={project.id} {...project} />
                ))}
            </div>
        </>
    );
}
