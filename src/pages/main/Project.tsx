import { useMemo, useState } from "react";
import CategoryTabs from "@/components/project/CategoryTabs";
import GenerationTabs from "@/components/project/GenerationTabs";
import PageLayout from "@/layouts/PageLayout";
import ProjectList from "@/components/project/ProjectList";
import QuoteCardList from "@/components/project/QuoteCardList";
import { useAllProjects } from "@/hooks/useAllProjects";
import { getGenerationListByYear } from "@/utils/getGenerationList";

const categoryMap: Record<string, string> = {
    전체: "",
    해커톤: "HACKATHON",
    아이디어톤: "IDEATHON",
    데모데이: "DEMO_DAY",
    "장기 프로젝트": "LONG_TERM_PROJECT"
};

export default function ProjectPage() {
    const generationTabs = useMemo(() => {
        const gens = getGenerationListByYear(2025, 13);
        return ["전체", ...gens];
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
                className="w-full flex flex-col text-white items-center px-28"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className="font-extrabold text-7xl mt-[85px] mb-18">
                    Project Archive<span className="text-[#FF7700] ">.</span>
                </div>

                <GenerationTabs
                    selected={projectGeneration}
                    onSelect={setprojectGeneration}
                    tabs={generationTabs}
                />

                <CategoryTabs selected={projectCategory} onSelect={setprojectCategory} />

                {isLoading ? (
                    <div className="text-white mt-12">로딩 중...🦁</div>
                ) : isError ? (
                    <div className="text-white mt-12">프로젝트를 불러오는데 실패했습니다.</div>
                ) : (
                    <ProjectList projects={projects || []} />
                )}

                <div className="w-full mt-24">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
}
