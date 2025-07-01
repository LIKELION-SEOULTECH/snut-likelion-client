import { InterviewBox } from "./InterviewBox";
import { InterviewList } from "@/constants/home/InterviewList";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";
const ExtendedInterviewList = [...InterviewList, ...InterviewList].map((item, i) => ({
    ...item,
    key: `${item.id}-${i}`
}));

export const InterviewSection = () => {
    return (
        <div className="flex flex-col pt-10 sm:pt-[355px] w-full items-center text-[#ffffff] bg-[#1b1b1b] pb-25 ">
            <h2 className="text-[20px] sm:text-[56px] pb-10 sm:pb-[73px] font-semibold">
                기존기수 인터뷰
            </h2>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={"auto"}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={5000}
                loop={true}
                className="w-full px-4 sm:px-[24px]"
                breakpoints={{
                    0: {
                        spaceBetween: 16
                    },
                    640: {
                        spaceBetween: 24
                    }
                }}
            >
                {ExtendedInterviewList.map(({ key, ...interview }) => (
                    <SwiperSlide key={key} className="!w-60 sm:!w-[480px]">
                        <InterviewBox {...interview} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
