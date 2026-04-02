import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { EllipsisVertical } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { deleteProject } from "@/apis/main/project";
import { getUserIdFromToken } from "@/utils/auth";
import type { Member } from "@/types/members";

export default function ProjectDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const projectId = Number(id);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const userId = getUserIdFromToken();

    const { data: projectDetailData, isLoading: isProjectDetailLoading } =
        useProjectDetail(projectId);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);

    const { data: allProjects, isLoading: isAllProjectsLoading } = useAllProjects();

    const deleteMutation = useMutation({
        mutationFn: (projectId: number) => deleteProject(projectId),
        onSuccess: () => {
            alert("삭제 완료");
            navigate(ROUTES.PROJECT);
        },
        onError: (err) => {
            console.error(err);
            alert("삭제 실패");
        }
    });

    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.scrollTo({
                left: currentImageIndex * slideRef.current.clientWidth,
                behavior: "smooth"
            });
        }
    }, [currentImageIndex]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    const isMember = data.members?.some((m: Member) => m.id === userId);

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
                <div className="w-full flex flex-col px-5 sm:px-28 text-white">
                    <div className="sm:w-304 flex flex-row justify-between mt-20">
                        <div className="hidden sm:flex flex-row text-xl text-[#7F7F7F] gap-1">
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
                        {isMember && (
                            <div className="relative" ref={menuRef}>
                                <EllipsisVertical
                                    className="text-gray-200 cursor-pointer"
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                />
                                {isMenuOpen && (
                                    <div className="w-[85px] absolute right-0 flex flex-col bg-gray-0 border border-gray-100 rounded-xl py-[11.5px] z-10">
                                        <div
                                            className="text-center font-medium text-gray-500 py-2 cursor-pointer leading-[100%]"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                navigate(`/project/edit/${data.id}`);
                                            }}
                                        >
                                            수정하기
                                        </div>

                                        <Separator />

                                        <div
                                            className="text-center font-medium text-error py-2 cursor-pointer leading-[100%]"
                                            onClick={() => {
                                                if (!confirm("정말 삭제하시겠습니까?")) return;
                                                deleteMutation.mutate(data.id);
                                            }}
                                        >
                                            삭제하기
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="relative w-full sm:w-304 aspect-[335/243] sm:aspect-[1216/684] mt-[38px] sm:mt-8 overflow-hidden rounded-2xl">
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
                                className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md w-13 h-13 rounded-full items-center justify-center cursor-pointer"
                                onClick={handlePrev}
                            >
                                <ArrowLeft />
                            </button>
                        )}
                        {currentImageIndex < imageList.length - 1 && (
                            <button
                                className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md w-13 h-13 rounded-full items-center justify-center cursor-pointer"
                                onClick={handleNext}
                            >
                                <ArrowRight />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-[148px] sm:gap-30">
                        <section className="mt-[30px] sm:mt-30">
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

                        <section className="flex flex-col mb-[110px]">
                            {isAllProjectsLoading ? (
                                <div className="mb-[109px] sm:mb-30">
                                    <div className="text-[28px] sm:text-[32px] text-center sm:text-start font-bold leading-[130%] tracking-[-0.02] mb-10 sm:mb-0">
                                        같은 기수 프로젝트
                                    </div>
                                    <div className="flex flex-row gap-4 justify-center sm:overflow-hidden mt-4">
                                        <Skeleton className="min-w-[221px] aspect-[221/160] sm:min-w-[395px] sm:h-[300px] rounded-lg" />
                                        <Skeleton className="min-w-[221px] aspect-[221/160] sm:min-w-[395px] sm:h-[300px] rounded-lg" />
                                        <Skeleton className="min-w-[221px] aspect-[221/160] sm:min-w-[395px] sm:h-[300px] rounded-lg" />
                                    </div>
                                </div>
                            ) : (
                                allProjects && (
                                    <OtherProjectSection
                                        currentProjectId={data.id}
                                        allProjects={allProjects}
                                    />
                                )
                            )}
                        </section>
                    </div>
                    <span className="hidden sm:block">
                        <QuoteCardList />
                    </span>
                </div>
            </div>
        </PageLayout>
    );
}
