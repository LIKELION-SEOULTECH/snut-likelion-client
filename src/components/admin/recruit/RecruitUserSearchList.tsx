import type { UserData } from "@/types/recruitment";
import { RecruitUserItem } from "./RecruitUserItem";

export const RecruitUserSearchList = ({ data }: { data: UserData[] }) => {
    return (
        <div>
            <div className="flex flex-row regular-14 mb-4 text-gray-900 gap-7">
                <div>
                    전체 <span className="text-orange-400">{data.length}</span>
                </div>
                <div>
                    합격 <span className="text-orange-400">{data.length}</span>
                </div>
            </div>
            <div className="w-full text-sm rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div className="grid grid-cols-[60px_100px_1fr_120px_120px_100px] h-10 items-center text-[#666666] font-medium bg-[#FAFAFA] px-6">
                    <span>No</span>
                    <span>이름</span>
                    <span>이메일</span>
                    <span>파트</span>
                    <span>지원날짜</span>
                    <span className="px-[9px]">결과</span>
                </div>

                {/* 리스트 content */}
                <div>
                    {data.map((member, index) => (
                        <RecruitUserItem key={member.id} member={member} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
