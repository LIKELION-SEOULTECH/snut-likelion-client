import { getProjectDetail } from "@/apis/main/project";
import { useQuery } from "@tanstack/react-query";

export const useProjectDetail = (projectId: number) => {
    return useQuery({
        queryKey: ["projectDetail", projectId],
        queryFn: () => getProjectDetail(projectId)
    });
};
