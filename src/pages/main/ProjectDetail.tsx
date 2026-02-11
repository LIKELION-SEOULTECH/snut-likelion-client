import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useProjectDetail } from "@/hooks/useProjectDetail";
import { mockProjectDetails } from "@/constants/mockProjectData"; // Import mock data

import PageLayout from "@/layouts/PageLayout";
import QuoteCardList from "@/components/project/QuoteCardList";
import { ProjectDetailSection } from "@/components/project/ProjectDetailSection";
import { ProjectReminderSection } from "@/components/project/ProjectRemindSection";
import { OtherProjectSection } from "@/components/project/OtherProjectSection";
import DirectoryIcon from "@/assets/project/directory-icon.svg?react";
import { ROUTES } from "@/routes/routes";
import ArrowLeft from "@/assets/project/arrow-left.svg?react";
import ArrowRight from "@/assets/project/arrow-right.svg?react";
import { useAllProjects } from "@/hooks/useAllProjects";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProjectCategory } from "@/types/project";

export default function ProjectDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const projectId = Number(id);

    const projectDetailData = mockProjectDetails[projectId];
    const isProjectDetailLoading = false;
    // const { data: projectDetailData, isLoading: isProjectDetailLoading } = useProjectDetail(projectId);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);

    const { data: allProjects, isLoading: isAllProjectsLoading } = useAllProjects();

    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.scrollTo({
                left: currentImageIndex * slideRef.current.clientWidth,
                behavior: "smooth"
            });
        }
    }, [currentImageIndex]);

    if (isProjectDetailLoading) {
        return (
            <PageLayout>
                <div
                    className="w-full flex justify-center mx-0"
                    style={{
                        background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                    }}
                >
                    <div className="flex flex-col text-white w-full max-w-[1216px]">
                        <div className="flex flex-row mt-20 text-xl text-[#7F7F7F] gap-1 items-center">
                            <span className="cursor-pointer">프로젝트</span>
                            <span className="flex items-center">
                                <DirectoryIcon />
                            </span>
                        </div>
                        <Skeleton className="relative w-full aspect-video mt-8 rounded-2xl" />
                        <div className="flex flex-col gap-[300px] mt-50">
                            <div className="w-full text-left text-[24px] mb-35">
                                프로젝트 정보를 불러오는 중...
                            </div>
                            <div className="text-[32px] font-bold mb-8">프로젝트 회고</div>
                            <div className="text-[32px] font-bold ">같은 기수 프로젝트</div>ㄴ
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    if (!projectDetailData)
        return (
            <div className="text-white flex justify-center mt-20">프로젝트를 찾을 수 없습니다.</div>
        );

    const data = projectDetailData;
    const imageList = data.imageUrls ?? [];

    const handlePrev = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: -slideRef.current.clientWidth, behavior: "smooth" });
        }
        setCurrentImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: slideRef.current.clientWidth, behavior: "smooth" });
        }
        setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
    };

    return (
        <PageLayout>
            <div
                className="w-full flex justify-center mx-0"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className=" flex flex-col px-28 text-white ">
                    <div className="flex  flex-row mt-20 text-xl text-[#7F7F7F] gap-1">
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
                        <span>{data.name}</span>
                    </div>
                    <div className="relative w-304 h-172 mt-8 overflow-hidden rounded-2xl">
                        <div ref={slideRef} className="flex overflow-hidden w-full h-full">
                            {imageList.map((img: string, i: number) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${data.name}-${i}`}
                                    className="w-full h-full object-cover flex-shrink-0"
                                />
                            ))}
                        </div>
                        {currentImageIndex > 0 && (
                            <button
                                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md w-13 h-13 rounded-full flex items-center justify-center cursor-pointer"
                                onClick={handlePrev}
                            >
                                <ArrowLeft />
                            </button>
                        )}
                        {currentImageIndex < imageList.length - 1 && (
                            <button
                                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md w-13 h-13 rounded-full flex items-center justify-center cursor-pointer"
                                onClick={handleNext}
                            >
                                <ArrowRight />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col gap-30">
                        <section className="mt-30">
                            <ProjectDetailSection
                                project={{
                                    ...data,
                                    category: data.category as ProjectCategory,
                                    websiteUrl: data.websiteUrl ?? undefined,
                                    playstoreUrl: data.playstoreUrl ?? undefined,
                                    appstoreUrl: data.appstoreUrl ?? undefined
                                }}
                            />
                        </section>

                        <section className="flex flex-col">
                            <ProjectReminderSection
                                projectId={data.id}
                                projectGen={data.generation}
                            />
                        </section>

                        <section className="flex flex-col">
                            {isAllProjectsLoading ? (
                                <>
                                    <div className="text-[32px] font-bold leading-[130%] tracking-[-0.02]">
                                        같은 기수 프로젝트
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-hidden mt-4">
                                        <Skeleton className="min-w-[395px] h-[300px] rounded-lg" />
                                        <Skeleton className="min-w-[395px] h-[300px] rounded-lg" />
                                        <Skeleton className="min-w-[395px] h-[300px] rounded-lg" />
                                    </div>
                                </>
                            ) : (
                                allProjects && (
                                    <OtherProjectSection
                                        currentProjectId={data.id}
                                        allProjects={allProjects}
                                    />
                                )
                            )}
                        </section>
                        <QuoteCardList />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
