const ActivityTimelineSection = () => {
    const timeline = [
        { month: "정기", label: "세션 및 스터디" },
        { month: "5월", label: "아이디어톤" },
        { month: "8월", label: "중앙해커톤" },
        { month: "12월", label: "데모데이" }
    ];

    return (
        <div className="flex flex-col pt-[560px] w-full ">
            <h2 className="flex justify-center text-[56px] font-semibold pb-[72px]">활동소개</h2>

            <div className="relative w-full h-28 flex items-center justify-center gap-[96px]  mx-auto mb-[82px]">
                <div
                    className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
                    style={{
                        border: "1px solid",
                        borderImageSource:
                            "linear-gradient(90deg, rgba(107, 50, 0, 0.2) 0%, #FF7700 50.35%, rgba(107, 50, 0, 0.2) 100%)",
                        borderImageSlice: 1
                    }}
                />

                {timeline.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-[114px] flex flex-col items-center mt-4 "
                    >
                        <span className="text-[#FF7700] text-[20px] font-semibold pb-[8px]">
                            {item.month}
                        </span>
                        <div className="w-[20px] h-[20px] bg-[#FF7700] rounded-full mt-2" />
                        <span className="text-[20px] font-semibold whitespace-nowrap pt-[32px]">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <button className="w-[216px] h-[76px] text-[24px] font-bold rounded-full cursor-pointer border-[2px] border-white text-white hover:bg-white hover:text-black transition duration-200 mb-[200px]">
                    세부 일정 보기
                </button>
            </div>
        </div>
    );
};

export default ActivityTimelineSection;
