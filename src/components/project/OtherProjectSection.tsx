import { useEffect, useRef } from "react";
import { ProjectBox } from "../home/ProjectBox";
import sample1 from "@/assets/home/sample1.png";
import sample2 from "@/assets/home/sample2.png";
import greenmate from "@/assets/project/green-mate.png";
import { ROUTES } from "@/constants/routes";

const tempProjects = Array.from({ length: 5 }, (_, index) => {
    const id = index + 1;
    return {
        id,
        title: `드링클리 ${id}`,
        description: `설명 ${id} - 호버하면 보이는 영역입니다!`,
        class: ["13기", "12기", "11기"][id % 3],
        tag: ["아이디어톤", "해커톤", "데모데이"][id % 3],
        image: id % 3 === 0 ? sample1 : id % 3 === 1 ? sample2 : greenmate,
        stack: ["web", "app", "ai"].filter((_, i) => (id + i) % 2 === 0)
    };
});

export const OtherProjectSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <div className="text-[32px] font-bold leading-[130%] tracking-[-0.02]">
                같은 기수 프로젝트
            </div>
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex flex-row gap-4">
                    {tempProjects.map((project) => (
                        <a
                            key={project.id}
                            href={`${ROUTES.PROJECT}/${project.id}`}
                            className="min-w-[395px] cursor-pointer block"
                        >
                            <ProjectBox {...project} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
