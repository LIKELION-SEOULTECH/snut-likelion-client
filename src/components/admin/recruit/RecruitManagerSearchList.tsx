import { RecruitManagerItem } from "./RecruitManagerItem";
import type { ManagerData } from "@/types/recruitment";

export const RecruitManagerSearchList = ({ data }: { data: ManagerData[] }) => {
    return (
        <div>
            <div className="flex flex-row regular-14 gap-7 mb-4">
                <div>
                    전체 <span className="text-orange-400">{data.length}</span>
                </div>
                <div>
                    합격 <span className="text-orange-400">{data.length}</span>
                </div>
            </div>
            <div className="w-full text-sm rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div className="grid grid-cols-[60px_100px_1fr_120px_120px_120px_100px] h-10 items-center text-[#666666] font-medium bg-[#FAFAFA] px-6">
                    <span>No</span>
                    <span>이름</span>
                    <span>이메일</span>
                    <span>부서</span>
                    <span>파트</span>
                    <span>지원날짜</span>
                    <span>결과</span>
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
