interface FooterProps {
    white?: boolean;
}

export const Footer = ({ white = false }: FooterProps) => {
    return (
        <div
            className={`h-18 sm:h-[97px] px-4 sm:px-[111px] justify-between flex items-center text-[#666666] text-xs sm:text-[14px] ${
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

            <a
                href={"https://www.instagram.com/likelion_st/"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="pr-[7px] sm:pr-0">Instagram</span>
            </a>
        </div>
    );
};
