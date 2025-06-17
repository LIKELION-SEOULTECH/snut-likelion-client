import { Link } from "react-router-dom";
import { SmallBtn } from "../Member/SmallBtn";

export const AuthLayout = ({
    title = "로그인",
    children
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className="w-full flex h-auto pt-[98px] pb-[177px] pl-[110px] pr-[113px]"
            style={{
                background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)"
            }}
        >
            {/* 왼쪽 */}
            <div className={`${title === "로그인" ? "pr-[408px]" : "pr-[207px]"}  `}>
                <div className="text-[22px] text-[#C4C4C4]">
                    <p className="font-semibold">LIKELION</p>
                    <span className="pr-2 font-light">With</span>
                    <span className="font-semibold">SEOULTECH</span>
                </div>
                <div className="font-extrabold text-7xl mt-[41px] text-[#FFF]">
                    {title}
                    <span className="text-[#FF7700]">.</span>
                </div>
                {title !== "로그인" && (
                    <Link to="/login" className="pt-[72px] flex">
                        <SmallBtn tag="← 로그인 화면으로" shape="round" />
                    </Link>
                )}
            </div>
            {/* 오른쪽 */}
            {children}
        </div>
    );
};
