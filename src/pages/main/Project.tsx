import { useEffect, useState } from "react";
import CategoryTabs from "@/components/project/CategoryTabs";
import GenerationTabs from "@/components/project/GenerationTabs";
import PageLayout from "@/layouts/PageLayout";
import ProjectList from "@/components/project/ProjectList";
import QuoteCardList from "@/components/project/QuoteCardList";
import { useAllProjects } from "@/hooks/useAllProjects";

const categoryMap: Record<string, string> = {
    전체: "",
    해커톤: "HACKATHON",
    아이디어톤: "IDEATHON",
    데모데이: "DEMO_DAY",
    "장기 프로젝트": "LONG_TERM_PROJECT"
};

export default function ProjectPage() {
    const [projectGeneration, setprojectGeneration] = useState("전체");
    const [projectCategory, setprojectCategory] = useState("전체");
    const [generations, setGenerations] = useState<string[]>([]);

    const { data: allProjectsData } = useAllProjects();

    useEffect(() => {
        if (allProjectsData) {
            const genList = Array.from(new Set(allProjectsData.map((p) => `${p.generation}기`))).sort(
                (a, b) => Number(b.replace("기", "")) - Number(a.replace("기", ""))
            );
            setGenerations(["전체", ...genList]);
        }
    }, [allProjectsData]);

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

                {/* 전체 기수 탭 유지 */}
                <GenerationTabs
                    selected={projectGeneration}
                    onSelect={setprojectGeneration}
                    tabs={generations}
                />

                <CategoryTabs selected={projectCategory} onSelect={setprojectCategory} />

                {loading ? (
                    <div className="text-white mt-12">로딩 중...🦁</div>
                ) : (
                    <ProjectList projects={projects} />
                )}

                <div className="w-full mt-24">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
}
