import { RecruitmentSection } from "@/components/home/RecruitmentSection";
import PageLayout from "@/layouts/PageLayout";

export default function HomePage() {
    return (
        <PageLayout>
            <div className="text-[#ffffff]">
                <div className="bg-[#1b1b1b]">
                    <RecruitmentSection />
                </div>
            </div>
        </PageLayout>
    );
}
