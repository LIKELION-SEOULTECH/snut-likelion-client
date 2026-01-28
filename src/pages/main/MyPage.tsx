import { useMemo, useState } from "react";
import { fetchMyMemberInfo, fetchLionInfo } from "@/apis/main/member";
import { MemberMyPage } from "@/components/my-page/MemberMyPage";
import { GuestMyPage } from "@/components/my-page/GuestMyPage";
import { MyPageTab } from "@/components/my-page/MyPageTab";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";
import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import samplePRf from "@/assets/Member/samplePRFIMG.png";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { ADMIN_ABS } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
    const navigate = useNavigate();
    const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);

    const isGuest = useMemo(() => {
        const role = localStorage.getItem("userRole");
        return role === "ROLE_GUEST";
    }, []);

    const isAdmin = useMemo(() => {
        const role = localStorage.getItem("userRole");
        return role === "ROLE_ADMIN";
    }, []);

    const { data: member, isLoading: memberLoading } = useQuery<MemberDetailResponse>({
        queryKey: ["me"],
        queryFn: fetchMyMemberInfo,
        enabled: !isGuest,
        staleTime: 1000 * 60 * 5
    });

    const activeGeneration = selectedGeneration ?? member?.generations?.[0] ?? null;

    const { data: lionInfo, isLoading: lionInfoLoading } = useQuery<LionInfoDetailsResponse>({
        queryKey: ["lionInfo", member?.id, activeGeneration],
        queryFn: () => fetchLionInfo(member!.id, activeGeneration!),
        enabled: !isGuest && !!member && activeGeneration !== null,
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData
    });

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
                                <img src={samplePRf} alt="프로필 이미지" width={291} height={281} />
                            </div>
                        ) : null}
                        <div className="w-[291px]">
                            <MyPageTab
                                isGuest={!!isGuest}
                                member={member!}
                                lionInfo={lionInfo!}
                                selectedGeneration={activeGeneration}
                            />
                        </div>
                        {isAdmin && (
                            <div className="mt-7">
                                <Button
                                    className="w-full h-[70px] text-xl text-gray-25 font-semibold bg-primary-800 border border-primary-400 gap-[6px] cursor-pointer hover:bg-primary-500"
                                    onClick={() => navigate(ADMIN_ABS.MEMBER)}
                                >
                                    어드민 <ArrowUpRight size={20} />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* 오른쪽 메인 컨텐츠 */}
                    <div className="flex-1">
                        {!isGuest ? (
                            <MemberMyPage
                                member={member}
                                memberLoading={memberLoading}
                                lionInfoLoading={lionInfoLoading}
                                lionInfo={lionInfo}
                                selectedGeneration={activeGeneration}
                                setSelectedGeneration={setSelectedGeneration}
                            />
                        ) : (
                            <GuestMyPage />
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
