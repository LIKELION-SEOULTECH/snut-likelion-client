import { useEffect, useState } from "react";
import { fetchMyMemberInfo, fetchLionInfo } from "@/apis/main/member";
import { MyPageMain } from "@/components/my-page/MyPageMain";
import { MyPageTab } from "@/components/my-page/MyPageTab";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";
import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";

export const MyPage = () => {
    const [isGuest, setIsGuest] = useState<boolean | null>(null);
    const [member, setMember] = useState<MemberDetailResponse | null>(null);
    const [lionInfo, setLionInfo] = useState<LionInfoDetailsResponse | null>(null);
    const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setIsGuest(role === "ROLE_GUEST");
    }, []);

    //  isGuest 판별
    useEffect(() => {
        if (isGuest === null) return;
        if (isGuest) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                // 내 정보
                const mem = await fetchMyMemberInfo();
                setMember(mem);

                // 기본 generation
                const firstGen = mem.generations?.[0] ?? null;
                setSelectedGeneration(firstGen);

                // generation - lionInfo
                if (firstGen !== null) {
                    const lion = await fetchLionInfo(mem.id, firstGen);
                    setLionInfo(lion);
                }
            } catch (err) {
                console.error("MyPage data load error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [isGuest]);

    // generation 변경 -  lionInfo 다시 로드
    useEffect(() => {
        if (isGuest === false && member && selectedGeneration !== null) {
            setLoading(true);
            fetchLionInfo(member.id, selectedGeneration)
                .then((res) => setLionInfo(res))
                .catch((err) => {
                    console.error("LionInfo load error:", err);
                    setLionInfo(null);
                })
                .finally(() => setLoading(false));
        }
    }, [selectedGeneration, isGuest, member]);

    //로딩
    if (loading) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center text-xl">
                내 정보를 불러오는 중...
            </div>
        );
    }

    if (isGuest === false && (!member || !lionInfo)) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center text-xl">
                내 정보를 불러올 수 없어요 😥
            </div>
        );
    }

    const handleGuestRecruit = async () => {
        try {
            // MEMBER, MANAGER 모집일정
            const [memberRes, managerRes] = await Promise.all([
                fetchRecentRecruitment("MEMBER"),
                fetchRecentRecruitment("MANAGER")
            ]);

            const now = new Date();
            const mOpen = new Date(managerRes.data.openDate);
            const mClose = new Date(managerRes.data.closeDate);
            const uOpen = new Date(memberRes.data.openDate);
            const uClose = new Date(memberRes.data.closeDate);

            // 기간
            console.log(
                `[운영진] ${managerRes.data.generation}기 → open: ${mOpen.toLocaleString()}, close: ${mClose.toLocaleString()}`
            );
            console.log(
                `[멤버]     ${memberRes.data.generation}기 → open: ${uOpen.toLocaleString()}, close: ${uClose.toLocaleString()}`
            );

            // 운영진 지원 가능
            if (mOpen <= now && now <= mClose) {
                navigate(ROUTES.RECRUIT_MANAGER);
                return;
            }
            // 멤버 지원 가능 기간
            if (uOpen <= now && now <= uClose) {
                navigate(ROUTES.RECRUIT_MEMBER);
                return;
            }

            // 지원기간 ㄴㄴ
            const upcoming: Array<{ type: "MANAGER" | "MEMBER"; open: Date }> = [];
            if (mOpen > now) upcoming.push({ type: "MANAGER", open: mOpen });
            if (uOpen > now) upcoming.push({ type: "MEMBER", open: uOpen });

            if (upcoming.length > 0) {
                // openDate 기준  → 가장 가까운 기간에 모집인곳
                upcoming.sort((a, b) => a.open.getTime() - b.open.getTime());
                const next = upcoming[0];
                if (next.type === "MANAGER") {
                    navigate(ROUTES.RECRUIT_MANAGER);
                } else {
                    navigate(ROUTES.RECRUIT_MEMBER);
                }
                return;
            }
            navigate(ROUTES.RECRUIT_MEMBER);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <PageLayout>
            <div
                className="w-full flex flex-col text-white items-center"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                {isGuest ? (
                    <div className="font-extrabold text-7xl my-[85px]">
                        My Page<span className="text-[#FF7700]">.</span>
                    </div>
                ) : (
                    <span className="my-[85px]" />
                )}

                <div className="px-[112px] w-full flex gap-[120px]">
                    {/* 왼쪽 사이드바 */}
                    <div className="flex flex-col">
                        {!isGuest && member?.profileImageUrl && (
                            <div className="w-[291px] h-[281px] flex overflow-hidden mb-[54px]">
                                <img
                                    className="w-full h-full object-contain"
                                    src={member.profileImageUrl}
                                    alt="프로필 이미지"
                                />
                            </div>
                        )}
                        {!isGuest && !member?.profileImageUrl ? (
                            <div className="w-[291px] h-[281px] flex overflow-hidden mb-[54px]">
                                <div className="w-full h-full border-1"></div>
                            </div>
                        ) : null}{" "}
                        <div className="w-[291px] h-[306px]">
                            <MyPageTab
                                isGuest={!!isGuest}
                                member={member!}
                                lionInfo={lionInfo!}
                                selectedGeneration={selectedGeneration}
                            />
                        </div>
                    </div>

                    {/* 오른쪽 메인 컨텐츠 */}
                    <div className="flex-1">
                        {!isGuest && selectedGeneration !== null ? (
                            <MyPageMain
                                member={member!}
                                selectedGeneration={selectedGeneration}
                                setSelectedGeneration={setSelectedGeneration}
                            />
                        ) : (
                            // 게스트일 경우 지원서 섹션
                            <>
                                <div className="flex justify-between mb-[29px]">
                                    <h4 className="text-[32px] text-white font-bold">
                                        내가 쓴 지원서
                                    </h4>
                                    <span
                                        className="text-[20px] underline text-[#7F7F7F] cursor-pointer"
                                        onClick={handleGuestRecruit}
                                    >
                                        {isGuest ? "지원하기" : "수정하기"}
                                    </span>
                                </div>
                                <div className="bg-[#404040] h-[98px] py-[35px] px-[40px] cursor-pointer text-[24px] rounded-[12px]">
                                    아직 작성한 지원서가 없습니다.
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* 아래 명언 카드 */}
                <div className="px-[112px] mt-[300px] w-full">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
};
