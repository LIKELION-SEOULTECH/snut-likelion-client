export const ProjectDetailSection = () => {
    return (
        <div className="flex flex-col mt-18">
            <div className="flex flex-row gap-4">
                <div className="h-12 px-5 rounded-full text-2xl bg-orange-500 text-black font-bold flex items-center justify-center">
                    13기
                </div>
                <div className="h-12 px-5 rounded-full text-2xl bg-orange-500 text-black font-bold flex items-center justify-center">
                    아이디어톤
                </div>
            </div>
            <div className="text-[50px] font-bold text-white mt-6">그린메이트 Green Mate</div>
            <div className="flex flex-row gap-3 mt-6">
                <div className="flex items-center justify-center px-4 text-base h-9 bg-[#2d2d2d] text-gray-100 rounded-[4px]">
                    웹
                </div>
                <div className="flex items-center justify-center px-4 text-base h-9 bg-[#2d2d2d] text-gray-100 rounded-[4px]">
                    React
                </div>
                <div className="flex items-center justify-center px-4 text-base h-9 bg-[#2d2d2d] text-gray-100 rounded-[4px]">
                    Docker
                </div>
            </div>
            <div className="mt-10">
                <div className="text-medium text-2xl text-[#ECECEC]">
                    식물을 집에서도 건강하게 키우는 방법. 그린메이트와 함께해요!
                </div>
                <div className="text-light text-xl text-[#C4C4C4] mt-3 leading-[150%]">
                    <p>
                        식물을 집에서도 건강하게 키우는 방법. 그린메이트와 함께해요! 식물을 집에서도
                        건강하게 키우는 방법. 그린메이트와 함께해요!
                    </p>
                    <p>
                        식물을 집에서도 건강하게 키우는 방법. 그린메이트와 함께해요! 식물을 집에서도
                        건강하게 키우는 방법. 그린메이트와 함께해요!
                    </p>
                    <p>
                        식물을 집에서도 건강하게 키우는 방법. 그린메이트와 함께해요! 식물을 집에서도
                        건강하게 키우는 방법. 그린메이트와 함께해요!
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-3 mt-9">
                <div className="flex justify-center items-center px-4 h-11 text-base font-medium leading-[150%] rounded-full bg-[#404040] cursor-pointer">
                    Play Store →
                </div>
                <div className="flex justify-center items-center px-4 h-11 text-base font-medium leading-[150%] rounded-full bg-[#404040] cursor-pointer">
                    App Store →
                </div>
            </div>
        </div>
    );
};
