import { useMemo, useState } from "react";
import CategoryTabs from "@/components/project/CategoryTabs";
import GenerationTabs from "@/components/project/GenerationTabs";
import PageLayout from "@/layouts/PageLayout";
import ProjectList from "@/components/project/ProjectList";
import QuoteCardList from "@/components/project/QuoteCardList";
// import { useAllProjects } from "@/hooks/useAllProjects";
import { getGenerationListByYear } from "@/utils/getGenerationList";
import { useAllProjects } from "@/hooks/useAllProjects";
// import { mock13thProjectData } from "@/constants/mockProjectData";

// type ProjectCategory = "HACKATHON" | "IDEATHON" | "DEMO_DAY";

const categoryMap: Record<string, string> = {
    전체: "",
    해커톤: "HACKATHON",
    아이디어톤: "IDEATHON",
    데모데이: "DEMO_DAY"
};

export default function ProjectPage() {
    const generationTabs = useMemo(() => {
        const gens = getGenerationListByYear(2025, 13);
        return ["전체", ...gens.map((gen) => `${gen}기`)];
    }, []);
    const [projectGeneration, setprojectGeneration] = useState("전체");
    const [projectCategory, setprojectCategory] = useState("전체");

    const params: { generation?: number; category?: string } = {};
    if (projectGeneration !== "전체") {
        params.generation = Number(projectGeneration.replace("기", ""));
    }
    if (projectCategory !== "전체") {
        params.category = categoryMap[projectCategory];
    }

    const { data: projects, isLoading, isError } = useAllProjects(params);

    return (
        <PageLayout>
            <div
                className="w-full flex flex-col text-white items-center px-5 sm:px-28"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className="flex flex-col sm:flex-row sm:gap-5 font-extrabold text-[35px] sm:text-7xl mt-10 mb-[38px] sm:mt-[85px] sm:mb-18 sm:whitespace-nowrap">
                    <span className="flex items-center justify-center h-[42px]">Project</span>
                    <span className="flex items-center h-[42px]">
                        Archive<span className="text-[#FF7700] ">.</span>
                    </span>
                </div>

                <GenerationTabs
                    selected={projectGeneration}
                    onSelect={setprojectGeneration}
                    tabs={generationTabs}
                />

                <CategoryTabs selected={projectCategory} onSelect={setprojectCategory} />

                {isError ? (
                    <div className="text-white mt-12">프로젝트를 불러오는데 실패했습니다.</div>
                ) : (
                    <>{projects && <ProjectList projects={projects} isLoading={isLoading} />}</>
                )}

                <div className="hidden sm:block w-full mt-24">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
}
