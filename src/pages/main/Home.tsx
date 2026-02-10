import { FAQSection } from "@/components/home/FAQSection";
import { ActivityDetailSection } from "@/components/home/ActivityDetailSection";
import ActivityTimelineSection from "@/components/home/ActivityTimelineSection";
import { RecruitmentSection } from "@/components/home/RecruitmentSection";
import { ProjectShowcaseSection } from "@/components/home/ProjectShowcaseSection";
import { InterviewSection } from "@/components/home/InterviewSection";
import { BottomCTASection } from "@/components/home/BottomCTASection";
import { MainVisualSection } from "@/components/home/MainVisualSection";
import { MissionSection } from "@/components/home/MissionSection";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout";

import Donut from "@/assets/home/donut.svg";
import Shadow from "@/assets/home/shadow.svg?react";

import ChatbotBtn from "@/assets/home/chatbot_btn.svg?react";
import ChatbotCloseBtn from "@/assets/home/ChatBotClose.svg?react";
import { ChatBotContainer } from "@/components/chatbot/ChatBotContainer";

import { NotificationModal } from "@/components/home/NotificationModal";
import { toast, Toaster } from "sonner";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";
import { ROUTES } from "@/routes/routes";

type VisualButtonType = "MANAGER_APPLY" | "NOTIFY" | "MEMBER_APPLY" | null;

export default function HomePage() {
    //챗봇 버튼. 모집 모달
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [recruitType, setRecruitType] = useState("");
    const navigate = useNavigate();

    const closeModal = () => setIsModalOpen(false);

    const handleToastClick = () => {
        toast("자세한 프로젝트 보기는 PC로만 가능합니다!", {
            unstyled: true,
            duration: 3000,
            classNames: {
                toast: "bg-[#333334cc] shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-[12px] text-white px-4 py-[10.5px] rounded-sm",
                title: "text-white text-sm font-mediumt",
                description: "text-red-400"
            }
        });
    };

    useEffect(() => {
        const isDesktop = window.innerWidth >= 640;

        if (isModalOpen && !isDesktop) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            toast("모집지원은 PC로만 가능합니다!", {
                unstyled: true,
                duration: 3000,
                classNames: {
                    toast: "bg-[#333334cc] shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-[12px] text-white px-4 py-[10.5px] rounded-sm",
                    title: "text-white text-sm font-mediumt",
                    description: "text-red-400"
                }
            });
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isModalOpen]);

    // 모집 일정 조회

    const [buttonType, setButtonType] = useState<VisualButtonType>(null);
    const [nextGeneration, setNextGeneration] = useState<number | null>(null);
    useEffect(() => {
        const fetchRecruitments = async () => {
            const fetchSafe = async (type: string) => {
                try {
                    return await fetchRecentRecruitment(type);
                } catch {
                    return null;
                }
            };

            const memberRes = await fetchSafe("MEMBER");

            const managerRes = await fetchSafe("MANAGER");

            const getRecruitmentData = (res: {
                data: {
                    closeDate: string;
                    openDate: string;
                    generation: number;
                    recruitmentType: string;
                };
            }) => {
                console.log(">>>", res);
                if (!res) return null;

                if (res.data) {
                    return Array.isArray(res.data) ? res.data[0] : res.data;
                }

                return res;
            };

            const managerData = getRecruitmentData(managerRes);
            const memberData = getRecruitmentData(memberRes);

            const now = new Date();
            const managerOpen = managerData?.openDate ? new Date(managerData.openDate) : null;
            const managerClose = managerData?.closeDate ? new Date(managerData.closeDate) : null;

            const memberOpen = memberData?.openDate ? new Date(memberData.openDate) : null;
            const memberClose = memberData?.closeDate ? new Date(memberData.closeDate) : null;

            const nextGeneration =
                getRecruitmentData(managerRes)?.generation + 1 ||
                getRecruitmentData(memberRes)?.generation + 1;

            setNextGeneration(nextGeneration);

            const visualType = getVisualButtonType(
                now,
                managerOpen,
                managerClose,
                memberOpen,
                memberClose
            );

            setButtonType(visualType);
        };

        fetchRecruitments();
    }, []);

    const getVisualButtonType = (
        now: Date,

        managerOpen: Date | null,
        managerClose: Date | null,
        memberOpen: Date | null,
        memberClose: Date | null
    ): VisualButtonType => {
        if (managerOpen && managerClose && now >= managerOpen && now <= managerClose) {
            return "MANAGER_APPLY";
        } else if (memberOpen && memberClose && now >= memberOpen && now <= memberClose) {
            return "MEMBER_APPLY";
        } else {
            return "NOTIFY";
        }

        return null;
    };

    //activityDetailSection 상세보기버튼
    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef<HTMLDivElement | null>(null);

    const handleShowDetail = () => {
        setShowDetail(true);
        setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    const openModal = () => {
        switch (buttonType) {
            case "NOTIFY":
                setIsModalOpen(true);
                break;
            case "MANAGER_APPLY":
                navigate(ROUTES.RECRUIT_MANAGER);
                break;
            case "MEMBER_APPLY":
                navigate(ROUTES.RECRUIT_MEMBER);
                break;
            default:
                break;
        }
    };

    return (
        <PageLayout>
            <Toaster position="bottom-center" />
            <div className=" text-white bg-[#1b1b1b] relative">
                <div className="fixed -left-[10vw] -bottom-[75px] z-20 h-[150px] w-[120vw]">
                    <Shadow className="w-full h-full " preserveAspectRatio="none" />
                </div>
                <MainVisualSection
                    onOpenModal={openModal}
                    buttonType={buttonType}
                    nextGeneration={nextGeneration}
                />
                <img
                    src={Donut}
                    alt="donut"
                    className="absolute w-[500px] h-[500px] sm:w-[1252px] sm:h-[1252px] top-90 sm:top-30 right-15 sm:right-25 lg:right-50 translate-x-1/2 animate-[floatTube_6s_ease-in-out_infinite]"
                />

                {/* chatbot #29*/}
                <section
                    onClick={() => setIsChatOpen((prev) => !prev)}
                    className="hidden sm:block fixed bottom-16 right-28 z-50 cursor-pointer"
                >
                    <ChatbotBtn className={`w-[72px] h-[72px] ${isChatOpen ? "hidden" : "flex"}`} />
                    <ChatbotCloseBtn
                        className={`w-[72px] h-[72px] ${isChatOpen ? "flex" : "hidden"}`}
                    />
                </section>
                <section className="fixed bottom-[166px] bg-white  rounded-[19.585px] right-[111px] z-1000">
                    {isChatOpen ? <ChatBotContainer /> : null}
                </section>
                <MissionSection />
                <RecruitmentSection />
                <ActivityTimelineSection onShowDetail={handleShowDetail} />
                {showDetail && (
                    <div ref={detailRef}>
                        <ActivityDetailSection />
                    </div>
                )}

                <ProjectShowcaseSection handleClick={handleToastClick} />

                <InterviewSection />
                <FAQSection />
                <BottomCTASection
                    onOpenModal={openModal}
                    buttonType={buttonType}
                    nextGeneration={nextGeneration}
                />
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <NotificationModal onClose={closeModal} nextGeneration={nextGeneration} />
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
