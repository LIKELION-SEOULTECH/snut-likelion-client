import { fetchMyMemberInfo, fetchLionInfo } from "@/apis/members";
import { MyPageMain } from "@/components/MyPage/MyPageMain";
import { MyPageTab } from "@/components/MyPage/MyPageTab";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";
import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import { useEffect, useState } from "react";

const isGuest = false;

export const MyPage = () => {
    const [member, setMember] = useState<MemberDetailResponse | null>(null);
    const [lionInfo, setLionInfo] = useState<LionInfoDetailsResponse | null>(null);
    const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMember = async () => {
            try {
                const res = await fetchMyMemberInfo();
                // 여러개 테스트...
                // const testGenerations = [res.generations[0], 12];
                // setMember(res);
                setMember({
                    ...res
                    // generations: testGenerations
                });
                if (res.generations.length > 0) {
                    setSelectedGeneration(res.generations[0]);
                }
            } catch (e) {
                console.error("멤버 정보 가져오기 실패", e);
            }
        };
        loadMember();
    }, []);

    useEffect(() => {
        const loadLionInfo = async () => {
            if (!member || selectedGeneration === null) return;
            try {
                const lionData = await fetchLionInfo(member.id, selectedGeneration);
                setLionInfo(lionData);
            } catch (e) {
                console.error("LionInfo 조회 실패", e);
            } finally {
                setLoading(false);
            }
        };
        loadLionInfo();
    }, [member, selectedGeneration]);

    if (loading) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center text-xl">
                내 정보를 불러오는 중...
            </div>
        );
    }

    if (!member || !lionInfo) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center text-xl">
                내 정보를 불러올 수 없어요 😥
            </div>
        );
    }

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

                <div className="px-[112px] w-full flex  gap-[120px]">
                    {/* 왼쪽 - 사진*/}
                    <div className="flex flex-col">
                        {isGuest ? null : (
                            <div className="w-[291px] h-[281px] flex overflow-hidden mb-[54px]">
                                <img
                                    className="w-full h-full object-contain"
                                    src={member.profileImageUrl}
                                />
                            </div>
                        )}
                        {/* 왼쪽 - 탭 */}
                        <div className="w-[291px] h-[306px] ">
                            <MyPageTab isGuest={isGuest} />
                        </div>
                    </div>
                    {/* 오른쪽 */}
                    {!isGuest ? (
                        <div className="flex-1">
                            {/* // 사자 마이페이지 */}
                            {selectedGeneration !== null && (
                                <MyPageMain
                                    member={member}
                                    selectedGeneration={selectedGeneration}
                                    setSelectedGeneration={setSelectedGeneration}
                                />
                            )}
                        </div>
                    ) : (
                        //게스트 마이페이지
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
                    )}
                </div>
                <div className="px-[112px] mt-[300px] w-full">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
};
