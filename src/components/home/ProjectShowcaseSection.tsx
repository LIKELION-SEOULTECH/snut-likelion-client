import { ProjectBox } from "./ProjectBox";
import { projectList } from "@/constants/home/projectList";

export const ProjectShowcaseSection = () => {
    return (
        <div className="relative flex flex-col pt-[160px] w-full text-[#ffffff] bg-[#1b1b1b] pb-[200px]">
            <h2 className="flex justify-center text-[56px] font-semibold pb-[72px]">프로젝트</h2>
            <div className="relative grid grid-cols-3 gap-[16px] w-[1216px] mx-auto ">
                {projectList.map((project) => (
                    <ProjectBox key={project.id} {...project} />
                ))}
                <div
                    className="flex w-[1218px] h-[631px] absolute pointer-events-none bottom-0 "
                    style={{
                        background: "linear-gradient(180deg, rgba(27, 27, 27, 0) 0%, #1B1B1B 100%)"
                    }}
                ></div>
                <button className=" text-[24px] w-[143px] h-[76px] bg-[#1B1B1B] font-bold absolute bottom-[48px] left-1/2 -translate-x-1/2 border rounded-full cursor-pointer  hover:bg-[#2D2D2D]">
                    더보기
                </button>
            </div>
        </div>
    );
};
