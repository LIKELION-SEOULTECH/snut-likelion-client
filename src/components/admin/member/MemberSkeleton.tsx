// admin 페이지 소식 데이터 조회 실패 시 ui 처리용
export const AdminMemberSkeleton = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div>
            <div className="text-sm mb-8">
                검색결과 <span className="text-orange-400">0</span>
            </div>

            <div className="w-full text-sm rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div className="h-10 items-center text-[#666666] font-medium bg-[#FAFAFA]">
                    <div className="h-10 flex text-medium-14 items-center text-sm text-[#666666] font-medium bg-[#FAFAFA] rounded-sm">
                        <span className="flex-[1] text-left pl-[30px]">No</span>
                        <span className="flex-[4] text-left">이름</span>
                        <span className="flex-[1.5] text-left">기수</span>
                        <span className="flex-[1.5] text-left">파트</span>
                        <span className="flex-[1.5] text-left">역할</span>
                    </div>
                </div>
                <div className="flex bg-white h-[567px] pt-[222px] justify-center text-[22px] font-semibold text-gray-100">
                    {isLoading ? (
                        <div>데이터를 불러오는 중 입니다</div>
                    ) : (
                        <div>검색결과가 없습니다</div>
                    )}
                </div>
            </div>
        </div>
    );
};
