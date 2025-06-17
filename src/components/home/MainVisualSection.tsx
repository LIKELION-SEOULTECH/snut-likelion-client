import { ReactTyped } from "react-typed";
import mainBg from "@/assets/home/main-bg.png";

type Props = {
    onOpenModal: () => void;
};

export const MainVisualSection = ({ onOpenModal }: Props) => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden pl-[110px] text-white">
            {/* 배경화면 */}
            <img
                src={mainBg}
                alt="main background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            {/* 컨텐츠 */}
            <div className="relative z-5">
                {/* likelion with seoul */}
                <div className="flex flex-col mt-24 text-[#c4c4c4] text-[22px] leading-[130%] tracking-[-0.02em] gap-[6px]">
                    <div className="font-semibold">LIKELION</div>
                    <div className="flex gap-2">
                        <span>With</span>
                        <span className="font-semibold">SEOULTECH</span>
                    </div>
                </div>
                {/* we are [디자이너,기획,개발자] */}
                <div className="flex flex-col mt-[41px]">
                    <div className="h-[114px] text-[88px] font-bold leading-[130%] tracking-[-0.01em]">
                        WE ARE
                    </div>
                    <div className="flex flex-row items-center h-[150px] -translate-y-[16px]">
                        <span className="text-[120px] mr-[11px] text-[#FF5401] font-regular">
                            {"["}
                        </span>
                        <span className="relative flex items-center top-[6px]">
                            <ReactTyped
                                className="text-[120px] font-[900] bg-gradient-to-r from-[#FF5100] via-[#FF7700] to-[#FFC08A] bg-clip-text text-transparent"
                                strings={["Developer", "Designer", "Planner"]}
                                typeSpeed={100}
                                backSpeed={60}
                                backDelay={1500}
                                loop
                                showCursor={false}
                                smartBackspace={false}
                            />
                            <span className="w-1 h-[98px] font-medium bg-[#FFBE85] mx-[18px]"></span>
                        </span>

                        <span className="text-[120px] text-[#FFBE85] font-regular">{"]"}</span>
                    </div>
                </div>
                <div className="h-9 text-[28px] mt-8 font-medium leading-[130%] ">
                    우리와 함께 아이디어를 실현 시킬 사자를 찾습니다.
                </div>
                {/* 컴포넌트 분리 */}
                <button
                    className="w-72 h-18 bg-[#ff7700] text-[25px] font-bold rounded-[250px] mt-[54px] mb-[134px] leading-[130%] tracking-[-0.02em] cursor-pointer"
                    onClick={onOpenModal}
                >
                    14기 모집 알림 받기 →
                </button>
            </div>
        </div>
    );
};
