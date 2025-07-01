import { useEffect, useState } from "react";
import { fetchAllProjects } from "@/apis/projects";
import type { ProjectData } from "@/types/project";

export function useAllProjects() {
    const [allProjects, setAllProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await fetchAllProjects();
            setAllProjects(data);
        };

        fetch();
    }, []);

    return { allProjects };
}
