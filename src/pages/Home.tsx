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
import { useRef, useState } from "react";

export default function HomePage() {
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
                <Header />

                <MainVisualSection />
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

                <BottomCTASection />
                <Footer />
            </div>
        </>
    );
}
