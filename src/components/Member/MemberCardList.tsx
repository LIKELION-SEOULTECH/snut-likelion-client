import { MemberCard } from "./MemberCard";
import { Link } from "react-router-dom";
import type { MemberResponse } from "@/types/members";
import { MemberCardSkeleton } from "./MemberCardSkeleton";

interface MemberCardProps {
    MemberData: MemberResponse[];
    isLoading: boolean;
}
export const MemberCardList = ({ MemberData, isLoading }: MemberCardProps) => {
    const showSkeleton = isLoading || MemberData.length === 0;
    return (
        <div className="grid grid-cols-4 gap-4 mt-12 w-[1216px] pb-[120px]">
            {showSkeleton
                ? Array.from({ length: 12 }).map((_, idx) => (
                      <MemberCardSkeleton key={`member-skeleton-${idx}`} />
                  ))
                : MemberData.map((member) => (
                      <Link key={member.id} to={`/members/${member.id}`} state={{ member }}>
                          <MemberCard {...member} />
                      </Link>
                  ))}
        </div>
    );
};
