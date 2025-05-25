import { useState } from "react";
import CategoryTabs from "@/components/project/CategoryTabs";
import GenerationTabs from "@/components/project/GenerationTabs";
import PageLayout from "@/layouts/PageLayout";
import ProjectList from "@/components/project/ProjectList";
import { mockProjectList } from "@/constants/mockProjectData";
import QuoteCardList from "@/components/project/QuoteCardList";

export default function ProjectPage() {
    const [generation, setGeneration] = useState("전체");
    const [category, setCategory] = useState("전체");

    const filteredProjects = mockProjectList.filter((project) => {
        const matchGen = generation === "전체" || project.class === generation;
        const matchCat = category === "전체" || project.tag === category;
        return matchGen && matchCat;
    });

    return (
        <PageLayout>
            <div
                className="w-full flex flex-col text-white items-center px-28"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className="font-extrabold text-7xl mt-[85px] mb-18">
                    Project Archive<span className="text-[#FF7700]">.</span>
                </div>
                <GenerationTabs selected={generation} onSelect={setGeneration} />
                <CategoryTabs selected={category} onSelect={setCategory} />
                <ProjectList projects={filteredProjects} />
                <QuoteCardList />
            </div>
        </PageLayout>
    );
}
