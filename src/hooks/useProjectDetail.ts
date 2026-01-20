import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "@/apis/projects";

export const useProjectDetail = (projectId: number) => {
    return useQuery({
        queryKey: ["projectDetail", projectId],
        queryFn: () => getProjectDetail(projectId)
    });
};
