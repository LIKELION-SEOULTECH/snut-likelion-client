export const ChatBotContainer = () => {
    return (
        <div>
            <div className="block w-[395px] h-[626px] bg-[#fff] rounded-[19.585px] text-[#000] ">
                <h4 className="flex h-[56px] w-full justify-center items-center font-semibold text-[#2D2D2D]">
                    멋쟁이 사자처럼 서울과학기술대학교
                </h4>
                <div className="pt-[15px] px-[20px] pb-[20px] h-[480px]"></div>
                <div className="flex justify-center text-[#A7A7A7]">
                    <input
                        type="text"
                        placeholder="질문을 입력해주세요"
                        className="w-[355px] h-[43px] px-4 py-3 text-sm rounded-[8px] focus:outline-none mx-auto bg-[#ECECEC]"
                    />
                </div>
                <div className="flex py-[16px] justify-center items-center gap-[6px]">
                    <div className="bg-[#34AE50] w-2 h-2 rounded"></div>
                    <div className="text-[#666] text-sm">몇 분 내 답변 받으실 수 있어요</div>
                </div>
            </div>
        </div>
    );
};
