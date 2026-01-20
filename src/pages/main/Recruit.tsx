import { useMemo, useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import joinUs from "@/assets/recruitment/JoinUs.jpg";
import { InfoBox } from "@/components/recruitment/InfoBox";
import { ManegerRoleLIst, RoleList } from "@/components/home/RoleList";
import QuoteCardList from "@/components/project/QuoteCardList";
import { useNavigate } from "react-router-dom";
import { useRecruitmentSchedule } from "@/hooks/useRecruitment";
import { NotificationModal } from "@/components/home/NotificationModal";

interface RecruitProps {
    isManager?: boolean;
}

const weekdayMap = ["일", "월", "화", "수", "목", "금", "토"];
function formatDate(dateStr: string, includeYear = true) {
    const d = new Date(dateStr);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const wd = weekdayMap[d.getDay()];
    if (includeYear) {
        return `${y}.${m}.${day} (${wd})`;
    }
    return `${m}.${day} (${wd})`;
}

function formatRange(open: string, close: string) {
    return `${formatDate(open, true)} ~ ${formatDate(close, false)}`;
}
export const Recruit = ({ isManager = false }: RecruitProps) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const recruitmentType = isManager ? "MANAGER" : "MEMBER";
    const { data: schedule, isLoading, isError } = useRecruitmentSchedule(recruitmentType);

    const isApplyOpen = useMemo(() => {
        if (!schedule) return false;
        const now = new Date();
        const open = new Date(schedule.data.openDate);
        const close = new Date(schedule.data.closeDate);
        return open <= now && now <= close;
    }, [schedule]);

    function addDays(dateStr: string, days: number): string {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + days);
        return d.toISOString();
    }

    const handleApplyClick = () => {
        if (!schedule) return;
        if (isApplyOpen) {
            navigate(isManager ? "/recruitform/manager" : "/recruitform/member", {
                state: { recId: schedule.id }
            });
        } else {
            setShowModal(true);
        }
    };

    const infoData = schedule?.data
        ? [
              {
                  title: "서류 접수",
                  date: formatRange(schedule.data.openDate, schedule.data.closeDate),
                  note: `총 ${Math.ceil(
                      (new Date(schedule.data.closeDate).getTime() -
                          new Date(schedule.data.openDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                  )}일`
              },
              {
                  title: "서류 발표",
                  date: formatDate(addDays(schedule.data.closeDate, 7), true),
                  note: "메일로 개별 발표"
              },
              {
                  title: "면접",
                  date: `${formatDate(addDays(schedule.data.closeDate, 12))} ~ ${formatDate(addDays(schedule.data.closeDate, 16))}`,
                  note: "개별 안내되는 일정에 따라 대면 진행"
              },
              {
                  title: "최종 발표",
                  date: formatDate(addDays(schedule.data.closeDate, 20)),
                  note: "메일로 개별 발표"
              }
          ]
        : [];

    const scheduleData = isManager ? Manager_ScheduleData : Member_ScheduleData;

    return (
        <PageLayout>
            <div className="w-full flex flex-col  bg-[#1B1B1B]">
                {/* Top Visual */}
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

                {/* 모집 일정 + 지원 버튼 */}
                <div className="mb-[180px] mx-[112px] flex">
                    <div className="flex-1 ">
                        <h4 className="text-[32px] text-white font-[700] mb-[44px]">모집 일정</h4>
                        <div className="w-[908px] flex flex-col gap-y-3 mb-[180px]">
                            {isLoading && <div>Loading...</div>}
                            {isError && <div>Error fetching schedule.</div>}
                            {infoData.map((e, i) => (
                                <div key={i} className="flex gap-x-4 w-full">
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
                                        {isManager
                                            ? " 차기 멋쟁이 사자처럼을 이끌어가고 싶으신 분"
                                            : " 아래 일정에 적극적으로 참여하실 수 있는 분"}
                                    </>
                                }
                            />
                            <div className="py-[23px] bg-[#ECECEC] font-medium px-[28px] h-auto rounded-[8px] text-[20px] flex flex-col flex-1 leading-[180%] ">
                                {scheduleData.map((item, idx) => (
                                    <div key={idx} className="mb-2">
                                        <span className="font-semibold">
                                            {item.title}{" "}
                                            <span className="text-[#f70]">{item.orangeText}</span>
                                        </span>
                                        <div className="text-[#666] pl-4 font-medium">
                                            {item.note}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 지원하기 버튼 */}
                    <button
                        className={`w-auto h-[71px] rounded-[250px] text-[24px] cursor-pointer font-bold  px-10 py-5 align-center leading-[130%] font-pretendard ${isApplyOpen ? " bg-[#F70] text-white" : "bg-[#3A3A3A] text-[#666]"}`}
                        onClick={handleApplyClick}
                    >
                        지원하기 →
                    </button>
                </div>

                {/* 모집 파트 */}
                <h4 className="text-[32px] text-white font-[700] mb-[44px] mx-[112px] flex">
                    파트 모집 분야
                </h4>
                <div className="relative flex flex-col items-center ">
                    <div className="relative z-5 text-white">
                        <RoleList />
                    </div>
                </div>
                {isManager && (
                    <>
                        <h4 className="text-[32px] mt-[180px] text-white font-[700] mb-[44px] mx-[112px] flex">
                            운영진 모집 분야
                        </h4>
                        <div className="relative flex flex-col items-center ">
                            <div className="relative z-5 text-white">
                                <ManegerRoleLIst />
                            </div>
                        </div>
                    </>
                )}

                {/* Quote */}
                <div className="w-full h-[150px] mt-[320px] px-28 bg-[#1B1B1B]">
                    <QuoteCardList />
                </div>

                {/* 모달 */}
                {showModal && schedule && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <NotificationModal
                            onClose={() => setShowModal(false)}
                            type={isManager ? "MANAGER" : "MEMBER"}
                        />
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

// 샘플... 임시..

const Member_ScheduleData = [
    {
        title: "• 학교 자체 OT: 3/20 (목)",
        orangeText: "대면",
        note: "* 불참 시 수료 불가"
    },
    { title: "• 전체 OT: 3/26 (수)", orangeText: "비대면", note: "* 불참 시 수료 불가" },
    {
        title: "• 정기 세션: 3월 ~ 12월",
        orangeText: "매주 목요일 2시간 가량 대면",
        note: "* 2회 불참 시 수료 불가"
    },
    { title: "• 중앙 해커톤", orangeText: "무박 2일", note: "* 불참시 수료 불가" }
];
const Manager_ScheduleData = Member_ScheduleData;
