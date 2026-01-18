import { useQuery } from "@tanstack/react-query";
import { fetchMembers } from "@/apis/main/member";
import type { MemberQueryParams } from "@/types/member";

export const useMembers = (params: MemberQueryParams) => {
    return useQuery({
        queryKey: ["members", params],
        queryFn: () => fetchMembers(params)
    });
};