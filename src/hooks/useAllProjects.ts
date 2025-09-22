import { useEffect, useState } from "react";

import type { ProjectData } from "@/types/project";
import { fetchAllProjects } from "@/apis/main/project";

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
