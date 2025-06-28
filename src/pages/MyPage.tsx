import { MyPageTab } from "@/components/MyPage/MyPageTab";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";

export const MyPage = () => {
    return (
        <PageLayout>
            <div
                className="w-full flex flex-col text-white items-center "
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className="font-extrabold text-7xl my-[85px]">
                    My Page<span className="text-[#FF7700] ">.</span>
                </div>

                <div className="px-[112px] w-full flex gap-[120px]">
                    {/* 왼쪽 - 탭 */}
                    <div className="w-[291px] h-[306px]">
                        <MyPageTab />
                    </div>
                    {/* 오른쪽 */}
                    <div className="flex-1">
                        <div className="flex justify-between mb-[29px]">
                            <h4 className="text-[32px] text-white font-bold">지원서</h4>
                            <span className="text-[20px] underline text-[#7F7F7F] cursor-pointer ">
                                수정하기
                            </span>
                        </div>
                        <div className="flex-1 bg-[#404040] h-[98px] py-[35px] px-[40px] cursor-pointer text-[24px] rounded-[12px]">
                            [아기사자] 디자인 파트 지원서
                        </div>
                    </div>
                </div>
                <div className="px-[112px] mt-[300px] w-full">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
};
