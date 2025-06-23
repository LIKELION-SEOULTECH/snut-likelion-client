import { Link } from "react-router-dom";
import { ProjectBox } from "./ProjectBox";
import { projectList } from "@/constants/home/projectList";
import { ROUTES } from "@/constants/routes";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const ExtendedProjectList = [...projectList, ...projectList].map((item, i) => ({
    ...item,
    key: `${item.id}-${i}`
}));

export const ProjectShowcaseSection = () => {
    return (
        <div className="relative flex flex-col pt-5 sm:pt-[160px] w-full text-[#ffffff] bg-[#1b1b1b] pb-25 sm:pb-[200px]">
            <h2 className="flex justify-center text-[20px] sm:text-[56px] font-semibold pb-10 sm:pb-[72px]">
                프로젝트
            </h2>

            {/* ✅ 모바일 Swiper */}
            <div className="sm:hidden w-full px-[24px]">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={"auto"}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    speed={5000}
                    loop={true}
                >
                    {ExtendedProjectList.map(({ key, ...project }) => (
                        <SwiperSlide key={key} className="!w-60">
                            <ProjectBox {...project} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ✅ 데스크톱 전용 Grid */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-[16px] w-[1216px] mx-auto relative">
                {projectList.map((project) => (
                    <ProjectBox key={project.id} {...project} />
                ))}
                <div
                    className="hidden sm:flex w-[1218px] h-[631px] absolute pointer-events-none bottom-0"
                    style={{
                        background: "linear-gradient(180deg, rgba(27, 27, 27, 0) 0%, #1B1B1B 100%)"
                    }}
                ></div>
                <Link to={ROUTES.PROJECT}>
                    <button className="hidden sm:flex items-center justify-center text-[24px] w-[143px] h-[76px] bg-[#1B1B1B] font-bold absolute sm:bottom-[48px] sm:left-1/2 sm:-translate-x-1/2 border rounded-full cursor-pointer hover:bg-[#2D2D2D]">
                        더보기
                    </button>
                </Link>
            </div>

            {/* ✅ 모바일 더보기 버튼 */}
            <Link to={ROUTES.PROJECT}>
                <button className="sm:hidden text-sm w-[69px] h-[33px] bg-[#1B1B1B] font-bold mx-auto mt-10 border-[0.4px] rounded-full cursor-pointer hover:bg-[#2D2D2D] block">
                    더보기
                </button>
            </Link>
        </div>
    );
};
