// admin 페이지 소식 데이터 조회 실패 시 ui 처리용
export const AdminRecruitSkeleton = ({
    isLoading,
    isManager
}: {
    isLoading: boolean;
    isManager: boolean;
}) => {
    return (
        <div>
            <div className="text-sm mb-8">
                검색결과 <span className="text-orange-400">0</span>
            </div>

            <div className="w-full text-sm rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div className="h-10 items-center text-[#666666] font-medium bg-[#FAFAFA]">
                    {isManager ? (
                        <div className="grid grid-cols-[60px_100px_1fr_120px_120px_120px_100px] h-10 items-center text-[#666666] font-medium bg-[#FAFAFA] px-6">
                            <span>No</span>
                            <span>이름</span>
                            <span>이메일</span>
                            <span>부서</span>
                            <span>파트</span>
                            <span>지원날짜</span>
                            <span>결과</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-[60px_100px_1fr_120px_120px_100px] h-10 items-center text-[#666666] font-medium bg-[#FAFAFA] px-6">
                            <span>No</span>
                            <span>이름</span>
                            <span>이메일</span>
                            <span>파트</span>
                            <span>지원날짜</span>
                            <span>결과</span>
                        </div>
                    )}
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
