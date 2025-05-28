import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockProjectList } from "@/constants/mockProjectData";
import PageLayout from "@/layouts/PageLayout";
import QuoteCardList from "@/components/project/QuoteCardList";
import { ProjectDetailSection } from "@/components/project/ProjectDetailSection";
import { ProjectReminderSection } from "@/components/project/ProjectRemindSection";
import { OtherProjectSection } from "@/components/project/OtherProjectSection";
import DirectoryIcon from "@/assets/project/directory-icon.svg?react";
import { ROUTES } from "@/constants/routes";
import sample from "@/assets/home/sample.png";
import ArrowLeft from "@/assets/project/arrow-left.svg?react";
import ArrowRight from "@/assets/project/arrow-right.svg?react";

export default function ProjectDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const project = mockProjectList.find((p) => p.id === Number(id));

    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.scrollTo({
                left: currentImageIndex * slideRef.current.clientWidth,
                behavior: "smooth"
            });
        }
    }, [currentImageIndex]);

    if (!project) return <div className="text-white">프로젝트를 찾을 수 없습니다.</div>;

    const imageList = [project.image, sample, project.image];
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
                    <span>{project.title}</span>
                </div>
                <div className="relative w-304 h-172 mt-8 overflow-hidden rounded-2xl">
                    <div ref={slideRef} className="flex overflow-hidden w-full h-full">
                        {imageList.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`${project.title}-${i}`}
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
                        <ProjectDetailSection project={project} />
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
