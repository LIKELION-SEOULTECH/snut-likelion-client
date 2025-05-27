import { useNavigate, useParams } from "react-router-dom";
import { mockProjectList } from "@/constants/mockProjectData";
import PageLayout from "@/layouts/PageLayout";
import QuoteCardList from "@/components/project/QuoteCardList";
import { ProjectDetailSection } from "@/components/project/ProjectDetailSection";
import { ProjectReminderSection } from "@/components/project/ProjectRemindSection";
import { OtherProjectSection } from "@/components/project/OtherProjectSection";
import DirectoryIcon from "@/assets/project/directory-icon.svg?react";
import { ROUTES } from "@/constants/routes";

export default function ProjectDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const project = mockProjectList.find((p) => p.id === Number(id));

    if (!project) return <div className="text-white">프로젝트를 찾을 수 없습니다.</div>;

    return (
        <PageLayout>
            <div
                className="flex flex-col px-28 text-white"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className="flex flex-row mt-20 text-xl text-[#7F7F7F] gap-1">
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            navigate(ROUTES.PROJECT);
                        }}
                    >
                        프로젝트
                    </span>
                    <span className="flex items-center">
                        <DirectoryIcon />
                    </span>
                    <span>그린메이트</span>
                </div>
                <div className="w-304 h-172 mt-8">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full rounded-2xl object-cover"
                    />
                </div>
                <div className="flex flex-col gap-30">
                    <section className="mt-30">
                        <ProjectDetailSection />
                    </section>

                    <section className="flex flex-col">
                        <ProjectReminderSection />
                    </section>

                    <section className="flex flex-col">
                        <OtherProjectSection />
                    </section>
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
}
