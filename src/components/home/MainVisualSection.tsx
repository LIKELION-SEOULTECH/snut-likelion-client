import { ReactTyped } from "react-typed";
import mainBg from "@/assets/home/main-bg.png";
import { getRecruitmentButtonText } from "@/utils/getRecruitmentButtonText";

export const MainVisualSection = ({
    onOpenModal,
    buttonType,
    nextGeneration,
    currentGeneration
}: {
    onOpenModal: () => void;
    buttonType: "NOTIFY" | "MANAGER_APPLY" | "MEMBER_APPLY" | null;
    nextGeneration: number | null;
    currentGeneration: number | null;
}) => {
    const text = getRecruitmentButtonText(buttonType, nextGeneration, currentGeneration);

    return (
        <div className="relative w-full overflow-hidden pl-[37px] sm:pl-[110px] text-white">
            {/* 배경화면 */}
            <img
                src={mainBg}
                alt="main background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            {/* 컨텐츠 */}
            <div className="relative z-5">
                {/* likelion with seoul */}
                <div className="flex flex-col mt-21 sm:mt-24 text-[#c4c4c4] text-base sm:text-[22px] leading-[130%] tracking-[-0.02em] gap-1 sm:gap-[6px]">
                    <div className="font-semibold">LIKELION</div>
                    <div className="flex gap-1 sm:gap-2">
                        <span>With</span>
                        <span className="font-semibold">SEOULTECH</span>
                    </div>
                </div>
                {/* we are [디자이너,기획,개발자] */}
                <div className="flex flex-col mt-8 sm:mt-[41px]">
                    <div className="h-[42px] sm:h-[114px] text-[32px] sm:text-[88px] font-bold leading-[130%] tracking-[-0.01em]">
                        WE ARE
                    </div>
                    <div className="flex flex-row items-center h-[62px] sm:h-[150px] sm:-translate-y-[16px]">
                        <span className="text-5xl sm:text-[120px] mr-[5.6px] sm:mr-[11px] text-[#FF5401] font-regular">
                            {"["}
                        </span>
                        <span className="relative flex items-center top-[6px]">
                            <ReactTyped
                                className="text-5xl sm:text-[120px] font-[900] bg-gradient-to-r from-[#FF5100] via-[#FF7700] to-[#FFC08A] bg-clip-text text-transparent"
                                strings={["Developer", "Designer", "Planner"]}
                                typeSpeed={100}
                                backSpeed={60}
                                backDelay={1500}
                                loop
                                showCursor={false}
                                smartBackspace={false}
                            />
                            <span className="w-[1.6px] sm:w-1 h-[39.2px] sm:h-[98px] font-medium bg-[#FFBE85] mx-[4.8px] sm:mx-[18px]"></span>
                        </span>

                        <span className="text-5xl sm:text-[120px] text-[#FFBE85] font-regular">
                            {"]"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row h-[50px] sm:h-9 text-[18px] sm:text-[28px] mt-25 sm:mt-8 font-medium leading-[130%]">
                    <span className="mr-[5px]">우리와 함께 아이디어를</span>
                    <span>실현시킬 사자를 찾습니다.</span>
                </div>
                {/* 컴포넌트 분리 */}
                <button
                    className="h-10 sm:h-18 bg-[#ff7700] text-base sm:text-[25px] font-bold rounded-[250px] mt-8 sm:mt-[54px] mb-[154px] sm:mb-[134px] px-5 sm:px-12 leading-[130%] tracking-[-0.02em] cursor-pointer"
                    onClick={onOpenModal}
                >
                    {text ? text : "14기 모집 알림 받기 →"}
                </button>
            </div>
        </div>
    );
};
