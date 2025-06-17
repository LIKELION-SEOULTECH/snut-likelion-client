import { X } from "lucide-react";

export const NotificationModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="flex justify-center items-center text-black">
            <div className="relative flex flex-col w-[807px] px-26 py-12 items-center rounded-[16px] bg-white">
                <button
                    className="absolute w-10 h-10 flex items-center justify-center rounded-[50px] top-[24px] right-[24px] bg-transparent  z-10 text-[#000] bg-black rounded-full cursor-pointer"
                    aria-label="모달 닫기"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <div className="text-[32px] font-medium leading-[140%] tracking-[-0.02em] text-center mb-10">
                    <span className="text-[#FF7700] font-bold">이메일</span>
                    <span>
                        을 등록하시면
                        <br />
                        다음모집이 시작될 때 알려드릴게요
                    </span>
                </div>

                <div className="w-full mb-13">
                    <div className="mb-[6px]">이메일</div>
                    <input
                        className="w-full h-14 px-[14px] py-4 border border-[#C4C4C4] rounded-[8px] text-xl focus:outline-none focus:ring-0"
                        placeholder="olivia@untitledui.com"
                    />
                </div>

                <button className="w-72 h-18 rounded-[250px] bg-[#FF7700] text-[25px] font-bold text-white cursor-pointer">
                    3기 모집 알림 받기 →
                </button>
            </div>
        </div>
    );
};
