import { RoleList } from "./RoleList";
import OvalLayer from "@/assets/home/oval_layer.png";

export const RecruitmentSection = () => {
    return (
        <div className="flex flex-col items-center pt-[325px]">
            <div className="text-[56px] font-semibold">새로운 사자를 찾습니다</div>
            <div className="flex text-center text-xl text-[#C4C4C4] leading-[130%] pt-7">
                국내 최대 규모의 IT 창업 동아리로, ”내 아이디어를 내 손으로 실현하자!”는 모토로
                <br />
                비전공자/전공자 구분 없이 자신이 원하는 IT 서비스를 구현할 수 있도록 각종 행사와
                스터디, 네트워킹을 지원합니다.
            </div>
            <div className="absolute top-[792px]">
                <img src={OvalLayer} className="w-screen h-auto" alt="oval layer" />
            </div>
            <div className="pt-18 mb-[400px]">
                <div className="relative z-5">
                    <RoleList />
                </div>
            </div>
        </div>
    );
};
