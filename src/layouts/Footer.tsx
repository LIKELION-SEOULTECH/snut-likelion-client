interface FooterProps {
    white?: boolean;
}

export const Footer = ({ white = false }: FooterProps) => {
    return (
        <div
            className={`h-[97px] px-[111px] justify-between flex items-center text-[#666666] text-[14px] ${
                white ? "bg-white" : "bg-[#1B1B1B]"
            }`}
        >
            <span>
                Copyright © 2025 멋쟁이사자처럼 서울과학기술대학교 Inc. All rights reserved.
            </span>
            <a
                href={"https://www.instagram.com/likelion_st/"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span>Instagram</span>
            </a>
        </div>
    );
};
