export const BasicApplyResult = () => {
    const items = [
        { label: "이름", value: "박진아" },
        { label: "학번", value: "23102207" },
        { label: "학과", value: "문화예술학과" },
        { label: "휴대폰 번호", value: "010-8634-0405" },
        { label: "학년", value: "3학년" },
        { label: "학적상태", value: "재학생" }
    ];

    return (
        <div className="flex flex-col py-12 px-15 bg-white text-black mb-12 rounded-sm">
            <span className="text-xl font-semibold mb-6">기본 질문</span>
            {items.map(({ label, value }, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === items.length - 1;

                return (
                    <div
                        key={label}
                        className={`flex items-center h-[107px] px-[30px] 
                            ${isFirst ? "border-t-2 border-[#7F7F7F]" : ""}
                            ${isLast ? "border-b-2 border-[#7F7F7F]" : ""}
                            ${!isLast ? "border-b border-[#7F7F7F]" : ""}
                        `}
                    >
                        <span className="w-[135px]">{label}</span>
                        <span>{value}</span>
                    </div>
                );
            })}
        </div>
    );
};

export const CommonApplyResult = () => {
    const items = [
        {
            label_q: "Q.",
            value_q:
                "본인의 포트폴리오에서 가장 기억에 남는 문항과 이게 기억에 남는 이유는 무엇인가요?",
            label_a: "A.",
            value_a:
                "전라북도 군산 명월동에서 진행된 <맥심골목> 프로모션을 위해 우리는 오프라인과 온라인 경험을 이어줄 아이디어가 필요했고, 맥심골목을 방문한 사용자들이 9개의 주요 지정 장소를 돌아다니며 디지털 스탬프를 수집하고 빙고를 완성하는 참여형 이벤트를 기획했습니다. 지정된 장소마다 특별히 제작된 디지털 스탬프를 비치해두고 이는 사용자의 <맥심 마이 포인트>앱을 통해 작동하도록 특별히 설계되었습니다."
        },
        {
            label_q: "Q.",
            value_q:
                "본인의 포트폴리오에서 가장 기억에 남는 문항과 이게 기억에 남는 이유는 무엇인가요?",
            label_a: "A.",
            value_a:
                "전라북도 군산 명월동에서 진행된 <맥심골목> 프로모션을 위해 우리는 오프라인과 온라인 경험을 이어줄 아이디어가 필요했고, 맥심골목을 방문한 사용자들이 9개의 주요 지정 장소를 돌아다니며 디지털 스탬프를 수집하고 빙고를 완성하는 참여형 이벤트를 기획했습니다. 지정된 장소마다 특별히 제작된 디지털 스탬프를 비치해두고 이는 사용자의 <맥심 마이 포인트>앱을 통해 작동하도록 특별히 설계되었습니다."
        }
    ];

    return (
        <div className="flex flex-col pt-12 pb-2 px-15 bg-white text-black mb-12 rounded-sm">
            <span className="text-xl font-semibold mb-6">공통 질문</span>
            {items.map(({ label_q, value_q, label_a, value_a }, index) => (
                <div key={index} className="border-y-2 border-[#7f7f7f] mb-10">
                    <div className="flex gap-4 border-b border-[#7f7f7f] px-[30px] py-10 leading-relaxed">
                        <span className="flex pl-[30px] items-center w-[98px] font-medium">
                            {label_q}
                        </span>
                        <span className="flex-1">{value_q}</span>
                    </div>
                    <div className="flex gap-4 px-[30px] py-10 leading-relaxed">
                        <span className="flex pl-[30px] items-center w-[98px] font-medium">
                            {label_a}
                        </span>
                        <span className="flex-1">{value_a}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
