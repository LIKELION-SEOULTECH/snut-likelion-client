import { RoleList } from "./RoleList";
import OvalLayer from "@/assets/home/oval_layer.png";

export const RecruitmentSection = () => {
    return (
        <div className="relative flex flex-col items-center pt-[90px] sm:pt-[325px]">
            <div className="text-xl sm:text-[56px] font-semibold">새로운 사자를 찾습니다</div>
            <div className="flex text-center text-sm sm:text-xl text-[#C4C4C4] leading-[130%] pt-3 sm:pt-7">
                {/* 데스크톱용 */}
                <div className="hidden sm:block">
                    국내 최대 규모의 IT 창업 동아리로, ”내 아이디어를 내 손으로 실현하자!”는 모토로
                    <br />
                    비전공자/전공자 구분 없이 자신이 원하는 IT 서비스를 구현할 수 있도록 각종 행사와
                    스터디, 네트워킹을 지원합니다.
                </div>

                {/* 모바일용 */}
                <div className="block sm:hidden">
                    국내 최대 규모의 IT 창업 동아리로, ”내 아이디어를
                    <br />
                    내 손으로 실현하자!”는 모토로 비전공자/전공자 구분 없이
                    <br />
                    자신이 원하는 IT 서비스를 구현할 수 있도록 각종 행사와
                    <br />
                    스터디, 네트워킹을 지원합니다.
                </div>
            </div>
            <div className="absolute top-80 sm:top-[792px]">
                <img src={OvalLayer} className="w-screen h-auto" alt="oval layer" />
            </div>
            <div className="pt-15 sm:pt-18 mb-31 sm:mb-100">
                <div className="relative z-5">
                    <RoleList />
                </div>
            </div>
        </div>
    );
};
