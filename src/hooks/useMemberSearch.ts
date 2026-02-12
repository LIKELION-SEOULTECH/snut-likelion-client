import { getMemberSearchList } from "@/apis/main/member";
import { useQuery } from "@tanstack/react-query";

export const useMemberSearch = (keyword: string) => {
    return useQuery({
        queryKey: ["member-search", keyword],
        queryFn: () => getMemberSearchList({ keyword }),
        enabled: keyword.trim().length > 0,
        staleTime: 5 * 60 * 1000
    });
};
