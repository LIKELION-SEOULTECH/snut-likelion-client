import PageLayout from "@/layouts/PageLayout";
import joinUs from "@/assets/Recruit/JoinUs.jpg";

import { ManegerRoleLIst, RoleList } from "@/components/home/RoleList";
import { InfoBox } from "@/components/Recruit/InfoBox";
import QuoteCardList from "@/components/project/QuoteCardList";
import { useNavigate } from "react-router-dom";

// 모집일정 //
const Member_InfoData = [
    { title: "서류 접수", date: "2025.02.21 (금) ~ 03.05 (수)", note: "총 13일" },
    { title: "서류 발표", date: "2025.03.09 (일)", note: "메일로 개별 발표" },
    {
        title: "면접",
        date: "2025.03.11 (화) ~ 03.13 (목)",
        note: "개별 안내되는 일정에 따라 대면 진행"
    },
    { title: "최종 발표", date: "2025.03.16 (일)", note: "메일로 개별 발표" }
];
const Maneger_InfoData = [
    { title: "서류 접수", date: "2025.02.21 (금) ~ 03.05 (수)", note: "총 13일" },
    { title: "서류 발표", date: "2025.03.09 (일)", note: "메일로 개별 발표" },
    {
        title: "면접",
        date: "2025.03.11 (화) ~ 03.13 (목)",
        note: "개별 안내되는 일정에 따라 대면 진행"
    },
    { title: "최종 발표", date: "2025.03.16 (일)", note: "메일로 개별 발표" }
];

//지원자격 및 모집 대상

const Member_ScheduleData = [
    {
        title: "• 학교 자체 OT: 3/20 (목)",
        orangeText: "대면",
        note: "* 불참 시 수료 불가"
    },
    {
        title: "• 전체 OT: 3/26 (수)",
        orangeText: "비대면",
        note: "* 불참 시 수료 불가"
    },
    {
        title: "• 정기 세션: 3월 ~ 12월",
        orangeText: "매주 목요일 2시간 가량 대면",
        note: "* 2회 불참 시 수료 불가"
    },
    {
        title: "• 중앙 해커톤",
        orangeText: "무박 2일",
        note: "* 불참시 수료 불가"
    }
];
const Mangeger_ScheduleData = [
    {
        title: "• 학교 자체 OT: 3/20 (목)",
        orangeText: "대면",
        note: "* 불참 시 수료 불가"
    },
    {
        title: "• 전체 OT: 3/26 (수)",
        orangeText: "비대면",
        note: "* 불참 시 수료 불가"
    },
    {
        title: "• 정기 세션: 3월 ~ 12월",
        orangeText: "매주 목요일 2시간 가량 대면",
        note: "* 2회 불참 시 수료 불가"
    },
    {
        title: "• 중앙 해커톤",
        orangeText: "무박 2일",
        note: "* 불참시 수료 불가"
    }
];

interface RecruitProps {
    isManeger?: boolean; // true면 운영진 모집
}

export const Recruit = ({ isManeger = false }: RecruitProps) => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <div className="w-full flex flex-col  bg-[#1B1B1B]">
                <div className="w-full h-[261px] relative mb-[120px] ">
                    <img
                        src={joinUs}
                        alt="join us"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                    <div
                        className="absolute inset-0 z-1"
                        style={{
                            background:
                                "linear-gradient(0deg, rgba(27, 27, 27, 0.80) 30.46%, rgba(0, 0, 0, 0.46) 109.54%)"
                        }}
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="font-extrabold text-7xl text-white">
                            Join us<span className="text-[#FF7700]">.</span>
                        </div>
                    </div>
                </div>
                <div className="mb-[180px] mx-[112px] flex">
                    <div className="flex-1 ">
                        <h4 className="text-[32px] text-white font-[700] mb-[44px]">모집 일정</h4>
                        <div className="w-[908px] flex flex-col gap-y-3 mb-[180px]">
                            {(isManeger ? Maneger_InfoData : Member_InfoData).map((e) => (
                                <div className="flex gap-x-4 w-full">
                                    <div className="w-[148px] text-center">
                                        <InfoBox text={e.title} centered={true} />
                                    </div>
                                    <InfoBox text={e.date} note={e.note} />
                                </div>
                            ))}
                        </div>
                        <h4 className="text-[32px] text-white font-[700] mb-[44px]">
                            지원 자격 및 모집 대상
                        </h4>
                        <div className="w-[908px] flex flex-col gap-y-3 ">
                            <InfoBox
                                text={
                                    <>
                                        <b>서울과학기술대학교 재학생 및 휴학생이면서</b>
                                        {isManeger
                                            ? " 차기 멋쟁이 사자처럼을 이끌어가고 싶으신 분"
                                            : " 아래 일정에 적극적으로 참여하실 수 있는 분"}
                                    </>
                                }
                            />
                            <div className="py-[23px] bg-[#ECECEC] font-medium px-[28px] h-auto rounded-[8px] text-[20px] flex flex-col flex-1 leading-[180%]">
                                {(isManeger ? Mangeger_ScheduleData : Member_ScheduleData).map(
                                    (item, idx) => (
                                        <div key={idx} className="mb-2">
                                            <span className="font-semibold">
                                                {item.title}{" "}
                                                <span className="text-[#f70]">
                                                    {item.orangeText}
                                                </span>
                                            </span>
                                            <div className="text-[#666] pl-4 font-medium">
                                                {item.note}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        className={`w-auto h-[71px] px-4 py-1 rounded-[250px] text-[24px] cursor-pointer bg-[#F70] text-black font-bold text-white px-10 py-5 align-center leading-[130%] font-pretendard`}
                        onClick={() => {
                            const target = isManeger
                                ? "/recruitform/maneger"
                                : "/recruitform/member";
                            navigate(target);
                        }}
                    >
                        지원하기 →
                    </button>
                </div>

                {/* 모집파트부터 아래 */}
                <h4 className="text-[32px] text-white font-[700] mb-[44px] mx-[112px] flex">
                    파트 모집 분야
                </h4>
                <div className="relative flex flex-col items-center">
                    <div className="relative z-5 text-white">
                        <RoleList />
                    </div>
                </div>
                {isManeger ? (
                    <div>
                        <h4 className="text-[32px] mt-[180px] text-white font-[700] mb-[44px] mx-[112px] flex">
                            운영진 모집 분야
                        </h4>
                        <div className="relative flex flex-col items-center">
                            <div className="relative z-5 text-white">
                                <ManegerRoleLIst />
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="w-full h-[150px] mt-[320px] px-28 bg-[#1B1B1B]">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
};
