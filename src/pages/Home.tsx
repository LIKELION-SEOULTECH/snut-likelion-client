import { RecruitmentSection } from "@/components/home/RecruitmentSection";
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
                </div>
            </div>
        </PageLayout>
    );
}
