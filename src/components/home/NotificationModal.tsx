import { X } from "lucide-react";

export const NotificationModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="flex justify-center items-center text-black">
            <div className="relative flex flex-col w-[300px] sm:w-[807px] px-7 sm:px-26 py-8 sm:py-12 items-center rounded-[16px] bg-white">
                <button
                    className="absolute w-5 sm:w-10 h-5 sm:h-10 flex items-center justify-center top-4 sm:top-[24px] right-4 sm:right-[24px] bg-transparent z-10 text-[#000] rounded-full cursor-pointer"
                    aria-label="모달 닫기"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <div className="text-base sm:text-[32px] font-medium leading-[140%] tracking-[-0.02em] text-center mb-6 sm:mb-10">
                    <span className="text-[#FF7700] font-bold">이메일</span>
                    <span>
                        을 등록하시면
                        <br />
                        다음모집이 시작될 때 알려드릴게요
                    </span>
                </div>

                <div className="w-full mb-8 sm:mb-13">
                    <div className="text-[14px] sm:text-base mb-[6px]">이메일</div>
                    <input
                        className="w-full h-9 sm:h-14 px-[14px] py-4 border border-[#C4C4C4] rounded-sm sm:rounded-[8px] text-sm sm:text-xl focus:outline-none focus:ring-0"
                        placeholder="olivia@untitledui.com"
                    />
                </div>

                <button className="w-full sm:w-72 h-[38px] sm:h-18 rounded-full bg-[#FF7700] text-sm sm:text-[25px] font-bold text-white cursor-pointer">
                    3기 모집 알림 받기 →
                </button>
            </div>
        </div>
    );
};
