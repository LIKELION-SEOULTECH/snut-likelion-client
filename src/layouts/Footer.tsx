import instaramIcon from "@/assets/Footer/instageram.png";
import githubIcon from "@/assets/Footer/github.png";

interface FooterProps {
    white?: boolean;
}

export const Footer = ({ white = false }: FooterProps) => {
    return (
        <div
            className={`h-28 sm:h-[97px] px-5 sm:px-[111px] sm:justify-between flex flex-col sm:flex-row sm:items-center text-[#666666] text-xs sm:text-[14px] pt-7 sm:pt-0 gap-6 sm:gap-0 ${
                white ? "bg-white" : "bg-[#1B1B1B]"
            }`}
        >
            <span className="hidden sm:inline">
                Copyright © 2025 멋쟁이사자처럼 서울과학기술대학교 Inc. All rights reserved.
            </span>
            <span className="sm:hidden">
                Copyright © 2025 멋쟁이사자처럼
                <br /> 서울과학기술대학교 Inc. All rights reserved.
            </span>

            <div className="flex gap-10 text-gray-400">
                <a
                    href={"https://www.instagram.com/likelion_st/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-[4px] flex flex-col w-[32px] h-[32px] object-fit sm:items-center"
                >
                    <img src={instaramIcon} alt="instagram" className="hidden sm:block" />
                    <span className="text-xs sm:text-sm">Instagram</span>
                </a>
                <a
                    href={"https://github.com/LIKELION-SEOULTECH"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-[4px] flex flex-col w-[32px] h-[32px] object-fit sm:items-center"
                >
                    <img src={githubIcon} alt="instagram" className="hidden sm:block" />
                    <span className="text-xs sm:text-sm">Github</span>
                </a>
            </div>
        </div>
    );
};
