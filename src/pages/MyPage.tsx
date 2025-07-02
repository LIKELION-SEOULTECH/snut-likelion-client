import { useEffect, useState } from "react";
import { fetchMyMemberInfo, fetchLionInfo } from "@/apis/members";
import { MyPageMain } from "@/components/MyPage/MyPageMain";
import { MyPageTab } from "@/components/MyPage/MyPageTab";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";
import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
// import type { MyApplicationsResponse } from "@/types/Recruit";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const MyPage = () => {
    const [member, setMember] = useState<MemberDetailResponse | undefined>(undefined);
    const [lionInfo, setLionInfo] = useState<LionInfoDetailsResponse | undefined>(undefined);
    const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const navigate = useNavigate();

    //지원서 내꺼
    // const [applications, setApplications] = useState<MyApplicationsResponse[]>([]);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setIsGuest(role === "ROLE_GUEST");
    }, []);

    //role-guest일 때 : 지원서
    // useEffect(() => {
    //     const loadApplications = async () => {
    //         if (!isGuest) return;
    //         try {
    //             const res = await fetchMyApplications();
    //             setApplications(res);
    //             console.log(res);
    //         } catch (err) {
    //             console.error("지원서 불러오기 실패", err);
    //             setApplications([]); // 실패 시도 비워줌
    //         }
    //     };
    //     loadApplications();
    // }, [isGuest]);

    //멤버 정보
    useEffect(() => {
        const loadMember = async () => {
            if (isGuest) return;
            try {
                const res = await fetchMyMemberInfo();
                setMember(res);
                if (res.generations.length > 0) {
                    setSelectedGeneration(res.generations[0]);
                }
            } catch (err) {
                console.error(err);
                setMember(undefined);
            }
        };
        loadMember();
    }, [isGuest]);

    useEffect(() => {
        const loadLionInfo = async () => {
            if (isGuest || !member || selectedGeneration === null) return;
            try {
                const res = await fetchLionInfo(member.id, selectedGeneration);
                setLionInfo(res);
            } catch (err) {
                console.error(err);
                setLionInfo(undefined);
            } finally {
                setLoading(false);
            }
        };
        loadLionInfo();
    }, [isGuest, member, selectedGeneration]);

    if (!isGuest && loading) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center text-xl">
                내 정보를 불러오는 중...
            </div>
        );
    }

    if (!isGuest && (!member || !lionInfo)) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center text-xl">
                내 정보를 불러올 수 없어요 😥
            </div>
        );
    }

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
                    <span className="my-[85px]"></span>
                )}

                <div className="px-[112px] w-full flex gap-[120px]">
                    {/* 왼쪽 */}
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
                        <div className="w-[291px] h-[306px]">
                            <MyPageTab
                                isGuest={isGuest}
                                member={member}
                                lionInfo={lionInfo}
                                selectedGeneration={selectedGeneration}
                            />
                        </div>
                    </div>

                    {/* 오른쪽 */}
                    <div className="flex-1">
                        {!isGuest && selectedGeneration !== null ? (
                            <MyPageMain
                                member={member!}
                                selectedGeneration={selectedGeneration}
                                setSelectedGeneration={setSelectedGeneration}
                            />
                        ) : (
                            // 게스트일 경우
                            <>
                                <div className="flex justify-between mb-[29px]">
                                    <h4 className="text-[32px] text-white font-bold">지원서</h4>
                                    <span
                                        className="text-[20px] underline text-[#7F7F7F] cursor-pointer"
                                        //여기 수정해야함... 운영진... 그리고 수정하기
                                        onClick={() => navigate(ROUTES.RECRUIT_MEMBER)}
                                    >
                                        지원하기
                                        {/* {applications.length === 0 ? "지원하기" : "수정하기"} */}
                                    </span>
                                </div>
                                {/* {applications.length === 0 ? ( */}
                                <div className="bg-[#404040] h-[98px] py-[35px] px-[40px] cursor-pointer text-[24px] rounded-[12px]">
                                    아직 작성한 지원서가 없습니다.
                                </div>
                                {/* ) : (
                                    applications.map((app) => (
                                        <div
                                            key={app.id}
                                            className="bg-[#404040] h-[98px] py-[35px] px-[40px] cursor-pointer text-[24px] rounded-[12px] mb-4"
                                        >
                                            {app.departmentType !== undefined
                                                ? `[운영진] ${app.departmentType} / ${app.part} 파트 지원서`
                                                : `[아기사자] ${app.part} 파트 지원서`}
                                        </div>
                                    ))
                                )} */}
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
