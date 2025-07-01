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
import PageLayout from "@/layouts/PageLayout";

import Donut from "@/assets/home/donut.svg?react";
import Shadow from "@/assets/home/shadow.svg?react";

import ChatbotBtn from "@/assets/home/chatbot_btn.svg?react";
import ChatbotCloseBtn from "@/assets/home/ChatBotClose.svg?react";
import { ChatBotContainer } from "@/components/ChatBotContainer";

import { NotificationModal } from "@/components/home/NotificationModal";
import { toast, Toaster } from "sonner";

export default function HomePage() {
    //챗봇 버튼. 모집 모달
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
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
        const isDesktop = window.innerWidth >= 640; // Tailwind sm: 640px

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

    //activityDetailSection 상세보기버튼
    const [showDetail, setShowDetail] = useState(false);
    const detailRef = useRef<HTMLDivElement | null>(null);

    const handleShowDetail = () => {
        setShowDetail(true);
        setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    return (
        <PageLayout>
            <Toaster position="bottom-center" />
            <div className=" text-white bg-[#1b1b1b] relative">
                <div className="fixed -left-[10vw] -bottom-[75px] z-20 h-[150px] w-[120vw]">
                    <Shadow className="w-full h-full " preserveAspectRatio="none" />
                </div>
                <MainVisualSection onOpenModal={openModal} />
                <Donut className="absolute w-[500px] h-[500px] sm:w-[1252px] sm:h-[1252px] top-90 sm:top-30 left-30 sm:left-160 animate-[floatTube_6s_ease-in-out_infinite]" />
                <ChatbotBtn className="hidden sm:block fixed bottom-16 right-28 z-50 transition-transform duration-300 hover:scale-120 cursor-pointer" />
                {/* chatbot #29*/}
                <section
                    onClick={() => setIsChatOpen((prev) => !prev)}
                    className="hidden sm:block fixed bottom-16 right-28 z-50 transition-transform duration-300 hover:scale-120 cursor-pointer"
                >
                    {!isChatOpen ? (
                        <ChatbotBtn />
                    ) : (
                        <ChatbotCloseBtn className="w-[92px] h-[92px]" />
                    )}
                </section>
                <section className="fixed bottom-[166px] bg-white  rounded-[19.585px] right-[111px] z-10 ">
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
                <BottomCTASection onOpenModal={openModal} />
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <NotificationModal onClose={closeModal} />
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
