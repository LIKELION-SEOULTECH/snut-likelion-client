import { InterviewBox } from "./InterviewBox";
import { InterviewList } from "@/constants/home/InterviewList";

export const InterviewSection = () => {
    return (
        <div className="flex flex-col pt-[355px] w-full items-center text-[#ffffff] bg-[#1b1b1b] pb-[200px] ">
            <h1 className="text-[56px] pb-[73px] font-semibold">기존기수 인터뷰</h1>
            <div className="flex gap-[24px]">
                {InterviewList.map((interview) => (
                    <InterviewBox key={interview.id} {...interview} />
                ))}
            </div>
        </div>
    );
};
