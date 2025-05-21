import { FAQSection } from "@/components/home/FAQSection";
import { ActivityDetailSection } from "@/components/home/ActivityDetailSection";
import ActivityTimelineSection from "@/components/home/ActivityTimelineSection";
import { RecruitmentSection } from "@/components/home/RecruitmentSection";
import { ProjectShowcaseSection } from "@/components/home/ProjectShowcaseSection";
import { InterviewSection } from "@/components/home/InterviewSection";
import PageLayout from "@/layouts/PageLayout";
import Donut from "@/assets/home/donut.svg?react";
import { MainVisualSection } from "@/components/home/MainVisualSection";
import { MissionSection } from "@/components/home/MissionSection";

export default function HomePage() {
    return (
        <PageLayout>
            <div className="relative text-[#ffffff]">
                <MainVisualSection />
                <Donut className="absolute top-30 left-160 animate-[floatTube_6s_ease-in-out_infinite]" />
                <div className="bg-[#1b1b1b]">
                    <MissionSection />
                    <RecruitmentSection />
                    <ActivityTimelineSection />
                    <ActivityDetailSection />
                    <ProjectShowcaseSection />
                    <InterviewSection />
                    <FAQSection />
                </div>
            </div>
        </PageLayout>
    );
}
