import { useEffect, useState } from "react";
import CategoryTabs from "@/components/project/CategoryTabs";
import GenerationTabs from "@/components/project/GenerationTabs";
import PageLayout from "@/layouts/PageLayout";
import ProjectList from "@/components/project/ProjectList";
import { fetchAllProjects } from "@/apis/projects";
import QuoteCardList from "@/components/project/QuoteCardList";
import type { ProjectData } from "@/types/project";

const categoryMap: Record<string, string> = {
    전체: "",
    해커톤: "HACKATHON",
    아이디어톤: "IDEATHON",
    데모데이: "DEMO_DAY"
};
export default function ProjectPage() {
    const [projectGeneration, setprojectGeneration] = useState("전체");
    const [projectCategory, setprojectCategory] = useState("전체");
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);

                // 기수... 카테고리..
                const params: { generation?: number; category?: string } = {};

                if (projectGeneration !== "전체") {
                    params.generation = Number(projectGeneration.replace("기", ""));
                }

                if (projectCategory !== "전체") {
                    params.category =
                        projectCategory !== "전체" ? categoryMap[projectCategory] : undefined;
                }
                console.log("요청 params : ", params);
                const data = await fetchAllProjects(params);
                setProjects(data);
            } catch (err) {
                console.error("프로젝트 불러오기 실패!!! :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [projectGeneration, projectCategory]);

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
                <GenerationTabs selected={projectGeneration} onSelect={setprojectGeneration} />
                <CategoryTabs selected={projectCategory} onSelect={setprojectCategory} />
                {/* 로딩 상태 처리 */}
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
