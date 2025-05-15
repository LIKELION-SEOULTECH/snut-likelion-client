import PageLayout from "@/layouts/PageLayout";
import { MainVisualSection } from "@/components/home/MainVisualSection";

import Donut from "@/assets/home/donut.svg?react";

export default function HomePage() {
    return (
        <PageLayout>
            <div className="text-[#ffffff]">
                <MainVisualSection />
                <Donut className="absolute top-30 left-160 animate-[floatTube_6s_ease-in-out_infinite]" />
            </div>
        </PageLayout>
    );
}
