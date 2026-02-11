import { useNavigate } from "react-router-dom";
import { SmallBtn } from "../Member/SmallBtn";
import { ROUTES } from "@/routes/routes";

export const AuthLayout = ({
    title = "로그인",
    children
}: {
    title: string;
    children: React.ReactNode;
}) => {
    const navigate = useNavigate();

    return (
        <div
            className="w-full flex h-auto pt-[98px] pb-[177px] pl-[110px] pr-[113px]"
            style={{
                background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)"
            }}
        >
            {/* 왼쪽 */}
            <div className={`${title === "로그인" ? "pr-[408px]" : "pr-[207px]"}  `}>
                <div className="text-[22px] text-[#C4C4C4]  gap-[6px] flex flex-col">
                    <p className="font-semibold mb-0">LIKELION</p>
                    <div>
                        <span className="pr-2 font-light">With</span>
                        <span className="font-semibold">SEOULTECH</span>
                    </div>
                </div>
                <div className="font-extrabold text-7xl mt-[41px] text-[#FFF] whitespace-nowrap">
                    {title}
                    <span className="text-[#FF7700]">.</span>
                </div>
                {title == "비밀번호 찾기" && (
                    <div onClick={() => navigate(ROUTES.LOGIN)} className="pt-[72px] flex">
                        <SmallBtn tag="← 로그인 화면으로" shape="round" />
                    </div>
                )}
                {title == "비밀번호 변경" && (
                    <div onClick={() => navigate(-1)} className="pt-[72px] flex">
                        <SmallBtn tag="← 마이페이지로" shape="round" />
                    </div>
                )}
            </div>
            {/* 오른쪽 */}
            {children}
        </div>
    );
};
