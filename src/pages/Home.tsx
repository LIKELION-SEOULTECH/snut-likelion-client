import { FAQSection } from "@/components/home/FAQSection";
import { ActivityDetailSection } from "@/components/home/ActivityDetailSection";
import ActivityTimelineSection from "@/components/home/ActivityTimelineSection";
import { RecruitmentSection } from "@/components/home/RecruitmentSection";
import { ProjectShowcaseSection } from "@/components/home/ProjectShowcaseSection";
import { InterviewSection } from "@/components/home/InterviewSection";
import { BottomCTASection } from "@/components/home/BottomCTASection";
import { MainVisualSection } from "@/components/home/MainVisualSection";
import { MissionSection } from "@/components/home/MissionSection";
import { Header } from "@/layouts/Header";
import { Footer } from "@/layouts/Footer";
import Donut from "@/assets/home/donut.svg?react";
import ChatbotBtn from "@/assets/home/chatbot_btn.svg?react";
import Shadow from "@/assets/home/shadow.svg?react";
import { useEffect, useRef, useState } from "react";
import { NotificationModal } from "@/components/home/NotificationModal";

export default function HomePage() {
    //모집 모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
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
        <>
            <div className=" text-white  bg-[#1b1b1b] relative">
                <div className="fixed -left-[10vw] -bottom-[75px] z-20 h-[150px] w-[120vw]">
                    <Shadow className="w-full h-full " preserveAspectRatio="none" />
                </div>
                <Header />
                <MainVisualSection onOpenModal={openModal} />
                <Donut className="absolute top-30 left-160 animate-[floatTube_6s_ease-in-out_infinite]" />
                <ChatbotBtn className="fixed bottom-16 right-28 z-50 transition-transform duration-300 hover:scale-120 cursor-pointer" />
                <MissionSection />
                <RecruitmentSection />
                <ActivityTimelineSection onShowDetail={handleShowDetail} />
                {showDetail && (
                    <div ref={detailRef}>
                        <ActivityDetailSection />
                    </div>
                )}
                <ProjectShowcaseSection />
                <InterviewSection />
                <FAQSection />
                <BottomCTASection onOpenModal={openModal} />
                <Footer />
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <NotificationModal onClose={closeModal} />
                    </div>
                )}{" "}
            </div>
        </>
    );
}
