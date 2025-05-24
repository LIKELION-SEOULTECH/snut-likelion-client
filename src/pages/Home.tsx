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

export default function HomePage() {
    return (
        <>
            <div className="text-white h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
                <section className="snap-start min-h-screen relative">
                    <Header />
                    <MainVisualSection />
                    <Donut className="absolute top-30 left-160 animate-[floatTube_6s_ease-in-out_infinite]" />
                    <ChatbotBtn className="fixed bottom-16 right-28 z-50 transition-transform duration-300 hover:scale-120 cursor-pointer" />
                </section>

                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <MissionSection />
                </section>
                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <RecruitmentSection />
                </section>
                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <ActivityTimelineSection />
                </section>
                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <ActivityDetailSection />
                </section>
                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <ProjectShowcaseSection />
                </section>
                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <InterviewSection />
                </section>
                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <FAQSection />
                </section>
                <section className="snap-start min-h-screen bg-[#1b1b1b]">
                    <BottomCTASection />
                    <Footer />
                </section>
            </div>
        </>
    );
}
