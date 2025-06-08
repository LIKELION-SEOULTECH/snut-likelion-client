interface FooterProps {
    white?: boolean;
}

export const Footer = ({ white = false }: FooterProps) => {
    return (
        <div
            className={`h-[97px] px-[111px] justify-between flex items-center text-[#666666] text-[14px] ${
                white ? "bg-white" : "bg-[#000000]"
            }`}
        >
            {" "}
            <span>
                Copyright © 2025 멋쟁이사자처럼 서울과학기술대학교 Inc. All rights reserved.
            </span>
            <span>Instagram</span>
        </div>
    );
};
