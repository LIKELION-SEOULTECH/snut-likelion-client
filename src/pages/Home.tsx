import ActivityTimelineSection from "@/components/home/ActivityTimelineSection";
import PageLayout from "@/layouts/PageLayout";

export default function HomePage() {
    return (
        <PageLayout>
            <div className="bg-[#1b1b1b] text-[#fff]">
                <ActivityTimelineSection />
            </div>
        </PageLayout>
    );
}
