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
        <div className="cursor-pointer group flex flex-col w-[231px] h-[592px] max-w-[478px] hover:w-[592px] border border-[#666666] flex-shrink-0 transition-all duration-500 px-5 py-[26px] rounded-[12px] backdrop-blur-[20px] bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(198,105,25,0.36)_100%)] overflow-hidden">
            <div>
                {/* Title & subtitle */}
                <div className="font-semibold text-[32px] mb-5 h-8">{title}</div>
                <div className="font-medium text-xl text-[#a7a7a7] mb-[0px]">{subtitle}</div>

                {/* Description - 나타내기 */}
                <div className="flex flex-col transform  opacity-0 group-hover:translate-x-0  group-hover:opacity-100 transition-all duration-200 group-hover:duration-800 ease-in text-[#c4c4c4] whitespace-pre-line">
                    <div>
                        <div className="font-semibold text-[18px] mt-[52px]">무슨 일을 하나요?</div>
                        <div className="font-light text-base mt-3 leading-[160%]">
                            {description1}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-[18px] mt-[52px]">
                            어떤 역량이 필요할까요?
                        </div>
                        <div className="font-light text-base leading-[160%]">{description2}</div>
                    </div>
                    <div>
                        <div className="font-semibold text-[18px] mt-[52px]">
                            우리는 이런 사람을 찾고 있어요!
                        </div>
                        <div className="font-light text-base leading-[160%]">{description3}</div>
                    </div>
                </div>

                <div className="absolute bottom-[26px] transition-opacity duration-200 left-5 group-hover:opacity-0">
                    <RoleDetailBtn />
                </div>
            </div>
        </div>
    );
};
