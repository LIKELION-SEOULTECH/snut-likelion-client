import PageLayout from "@/layouts/PageLayout";
import { MissionSection } from "@/components/home/MissionSection";

export default function HomePage() {
    return (
        <PageLayout>
            <div className="bg-[#1b1b1b]">
                <MissionSection />
            </div>
        </PageLayout>
    );
}
