// admin 페이지 소식 데이터 조회 실패 시 ui 처리용
export const AdminNoticeSkeleton = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div>
            <div className="text-sm mb-8">
                검색결과 <span className="text-orange-400">0</span>
            </div>

            <div className="w-full text-sm rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div className="h-10 flex items-center text-[#666666] font-medium bg-[#FAFAFA] px-5">
                    <span className="flex items-center justify-start flex-[1] text-center ">
                        <input
                            type="checkbox"
                            disabled={true}
                            className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs checked:bg-[#FF7700] checked:border-transparent checked:after:content-['✓'] checked:after:text-white checked:after:text-[16px] checked:after:block checked:after:text-center checked:after:leading-[1rem] flex items-center justify-center align-middle"
                        />
                    </span>

                    <span className="flex-[3.5] text-left pl-9 min-w-5">No</span>
                    <span className="flex-[21.5] text-left">제목</span>
                    <span className="flex-[2.7] text-left min-w-20">등록일</span>
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
