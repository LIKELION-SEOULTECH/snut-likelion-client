import { MemberCard } from "./MemberCard";
import { Link } from "react-router-dom";
import type { MemberResponse } from "@/types/members";
import { MemberCardSkeleton } from "./MemberCardSkeleton";

interface MemberCardProps {
    MemberData?: MemberResponse[];
    isLoading: boolean;
}

export const MemberCardList = ({ MemberData, isLoading }: MemberCardProps) => {
    return (
        <>
            {MemberData?.length === 0 ? (
                <section className="w-full flex justify-center items-center min-h-147">
                    <span className="text-gray-200 font-medium text-2xl">검색결과가 없습니다</span>
                </section>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-[43.6px] w-full sm:mt-12 sm:w-[1216px] pb-[92px]">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, idx) => (
                              <MemberCardSkeleton key={`member-skeleton-${idx}`} />
                          ))
                        : MemberData?.filter((member) => member.id !== 3).map((member) => (
                              <Link key={member.id} to={`/members/${member.id}`} state={{ member }}>
                                  <MemberCard {...member} />
                              </Link>
                          ))}
                </div>
            )}
        </>
    );
};
