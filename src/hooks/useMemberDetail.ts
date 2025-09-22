import { useQuery } from "@tanstack/react-query";
import { fetchMemberDetail } from "@/apis/main/member";

export const useMemberDetail = (id: number) => {
    return useQuery({
        queryKey: ["memberDetail", id],
        queryFn: () => fetchMemberDetail(id)
    });
};
