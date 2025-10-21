import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "@/apis/main/project";
import type { ProjectQueryParams, Project } from "@/types/project";

export const useAllProjects = (params?: ProjectQueryParams) => {
    return useQuery<Project[], Error>({
        queryKey: ["allProjects", params],
        queryFn: () => fetchAllProjects(params),
    });
};