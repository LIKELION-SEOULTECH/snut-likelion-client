import { RecruitManagerItem } from "./RecruitManagerItem";
import type { ManagerData } from "@/types/recruit";

export const RecruitManagerSearchList = ({ data }: { data: ManagerData[] }) => {
    return (
        <div>
            <div className="text-sm mb-4">
                검색결과 <span className="text-orange-400">{data.length}</span>
            </div>
            <div className="w-full text-sm rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div className="h-10 flex items-center text-[#666666] font-medium bg-[#FAFAFA]">
                    <span className="flex-[1] text-left pl-[30px]">No</span>
                    <span className="flex-[1] text-left">이름</span>
                    <span className="flex-[3.5] text-left">이메일</span>
                    <span className="flex-[1] text-left">부서</span>
                    <span className="flex-[1] text-left">파트</span>
                    <span className="flex-[1.5] text-left">지원날짜</span>
                    <span className="flex-[1] text-left">결과</span>
                </div>
                {/* 리스트 content */}
                <div>
                    {data.map((member, index) => (
                        <RecruitManagerItem key={member.id} member={member} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
