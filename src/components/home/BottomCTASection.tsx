import welcomeImg from "../../assets/home/WELCOME.svg";
import { getRecruitmentButtonText } from "@/utils/getRecruitmentButtonText";

type Props = {
    onOpenModal: () => void;
    buttonType: "NOTIFY" | "MANAGER_APPLY" | "MEMBER_APPLY" | null;
    nextGeneration: number | null;
    currentGeneration: number | null;
};

export const BottomCTASection = ({
    onOpenModal,
    buttonType,
    nextGeneration,
    currentGeneration
}: Props) => {
    const text = getRecruitmentButtonText(buttonType, nextGeneration, currentGeneration);

    return (
        <div className="flex flex-col pt-10 sm:pt-[244px] w-full h-auto  bg-[#1b1b1b]">
            <div
                className=" relative w-full h-60 sm:h-[480px] flex flex-col justify-center items-center"
                style={{ background: "linear-gradient(98.85deg, #FF5900 1.18%, #FFC859 98.14%)" }}
            >
                <img src={welcomeImg} alt="welcome" className="w-full absolute bottom-0" />
                <h2 className="w-[772px]  text-[#1B1B1B] text-center text-2xl sm:text-[64px] font-extrabold leading-[130%] mb-5 sm:mb-[40px]">
                    지금 바로
                    <br />
                    멋사 무리에 합류하세요!
                </h2>
                <button
                    onClick={onOpenModal}
                    className="z-10 bg-[#1B1B1B] mx-auto text-[#ECECEC] w-[180px] sm:w-[280px] h-10 sm:h-[76px] rounded-[300px] font-bold cursor-pointer flex items-center justify-center"
                >
                    <span className="max-w-full overflow-hidden text-ellipsis  text-base sm:text-[24px]">
                        {text || "모집 알람 받기"}
                    </span>
                </button>
            </div>
        </div>
    );
};
