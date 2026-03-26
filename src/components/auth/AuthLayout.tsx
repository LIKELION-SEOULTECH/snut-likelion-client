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
            className="w-full flex flex-col items-center sm:items-start sm:flex-row pt-[92px] sm:pt-[98px] pb-[186px] sm:pb-[177px] pl-5 pr-5 sm:pl-[110px] sm:pr-[113px]"
            style={{
                background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)"
            }}
        >
            {/* 왼쪽 */}
            <div className="flex-1 pr-0 sm:pr-10">
                <div className="text-[22px] text-[#C4C4C4] gap-[6px] flex-col hidden sm:flex">
                    <p className="font-semibold mb-0">LIKELION</p>
                    <div>
                        <span className="pr-2 font-light">With</span>
                        <span className="font-semibold">SEOULTECH</span>
                    </div>
                </div>
                <div className="font-extrabold text-[35px] sm:text-7xl mt-0 sm:mt-[41px] text-[#FFF] whitespace-nowrap">
                    {title}
                    <span className="text-[#FF7700]">.</span>
                </div>
                {title == "비밀번호 찾기" && (
                    <div onClick={() => navigate(ROUTES.LOGIN)} className="pt-[72px] flex">
                        <SmallBtn tag="← 로그인 화면으로" shape="round" />
                    </div>
                )}
                {title == "비밀번호 변경" && (
                    <div onClick={() => navigate(-1)} className="hidden sm:flex pt-[72px]">
                        <SmallBtn tag="← 마이페이지로" shape="round" />
                    </div>
                )}
            </div>
            {/* 오른쪽 */}
            <div className="w-full sm:max-w-150">{children}</div>
        </div>
    );
};
