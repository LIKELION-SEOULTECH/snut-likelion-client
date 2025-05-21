import type { RoleCardProps } from "@/types/home";
import { RoleDetailBtn } from "./RoleDetailBtn";

export const RoleCard = ({
    title,
    subtitle,
    description1,
    description2,
    description3
}: RoleCardProps) => {
    return (
        <div className="group flex flex-col w-[231px] hover:w-[478px] border border-[#666666] flex-shrink-0 transition-all duration-300 px-5 py-[26px] rounded-[12px] backdrop-blur-[20px] bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(198,105,25,0.36)_100%)] overflow-hidden">
            <div>
                {/* Title & subtitle */}
                <div className="font-semibold text-[32px] mb-5">{title}</div>
                <div className="font-medium text-xl text-[#a7a7a7] mb-[52px]">{subtitle}</div>

                {/* Description - 나타내기 */}
                <div className="flex flex-col hidden group-hover:block transition-all text-[#c4c4c4] whitespace-pre-line">
                    <div>
                        <div className="font-semibold text-[18px] mt-[52px]">무슨 일을 하나요?</div>
                        <div className="font-light text-base mt-3">{description1}</div>
                    </div>
                    <div>
                        <div className="font-semibold text-[18px] mt-[52px]">
                            어떤 역량이 필요할까요?
                        </div>
                        <div className="font-light text-base">{description2}</div>
                    </div>
                    <div>
                        <div className="font-semibold text-[18px] mt-[52px]">
                            우리는 이런 사람을 찾고 있어요!
                        </div>
                        <div className="font-light text-base">{description3}</div>
                    </div>
                </div>

                {/* Detail Btn - 숨기기 */}
                <div className="mt-105 group-hover:hidden transition-all duration-300">
                    <RoleDetailBtn />
                </div>
            </div>
        </div>
    );
};
