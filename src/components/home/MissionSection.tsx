import Sample from "@/assets/home/sample.png";

export const MissionSection = () => {
    const values = [
        {
            key: "L",
            word: "ead",
            description: "스스로 주도하고 이끌어 나간다",
            keyColor: "#FF7700",
            wordColor: "#ffffff",
            descColor: "#c4C4C4"
        },
        {
            key: "I",
            word: "nnovate",
            description: "끊임없이 새로움을 추구한다",
            keyColor: "#FF7700",
            wordColor: "#ffffff",
            descColor: "#c4C4C4"
        },
        {
            key: "O",
            word: "pen",
            description: "누구에게나 열려있다",
            keyColor: "#FF7700",
            wordColor: "#ffffff",
            descColor: "#c4C4C4"
        },
        {
            key: "N",
            word: "etwork",
            description: "사람과 아이디어를 연결한다",
            keyColor: "#FF7700",
            wordColor: "#ffffff",
            descColor: "#c4C4C4"
        }
    ];
    return (
        <div className="flex flex-col pt-40 pl-[110px] pb-[400px]">
            {/* mission field */}
            <div className="flex flex-col gap-4">
                {values.map(({ key, word, description }, index) => (
                    <div key={index} className="h-[86px] flex flex-row items-center gap-[33px]">
                        <div className="text-[72px] font-extrabold tracking-[0.01em]">
                            <span className="text-[#ff7700]">{key}</span>
                            <span className="text-[#ffffff]">{word}</span>
                        </div>
                        <span className="text-[28px] text-[#c4c4c4] font-light tracking-[-0.02em] whitespace-nowrap">
                            {description}
                        </span>
                    </div>
                ))}
            </div>
            {/* picture + 멋대 과기대 */}
            <div className="mt-15 relative w-[95vw] min-w-[1200px] mx-auto">
                <img src={Sample} alt="소개 이미지" className="w-full object-cover" />

                <div className="absolute -bottom-43 -right-3 z-10 pr-10">
                    <div className="text-[clamp(4.9rem,6.5vw,5rem)] font-bold text-white leading-[1.4] tracking-[-0.02em] overflow-x-hidden whitespace-nowrap">
                        함께 성장하는 멋쟁이 사자처럼
                        <br />
                        서울과학기술대학교입니다<span className="text-[#FF7700]">.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
