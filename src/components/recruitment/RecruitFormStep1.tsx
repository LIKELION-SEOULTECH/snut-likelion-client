interface RecruitFormStep1Props {
    isManeger: boolean;
    selectedPart: string;
    selectedDepartment: string;
    onSelect: (field: "part" | "departmentType", value: string) => void;
    onNext: () => void;
}

const PARTS = [
    { ko: "기획자", en: "Planner", id: "PLANNING" },
    { ko: "디자이너", en: "Designer", id: "DESIGN" },
    { ko: "프론트엔드", en: "Front-end", id: "FRONTEND" },
    { ko: "백엔드", en: "Back-end", id: "BACKEND" },
    { ko: "인공지능", en: "A.I", id: "AI" }
];

const DEPARTMENTS = [
    { ko: "학술부", en: "Academic Department", id: "ACADEMIC" },
    { ko: "홍보부", en: "Public Relations Department", id: "MARKETING" },
    {
        ko: "운영부",
        en: "Operations Department",
        id: "OPERATION"
    }
];

export const RecruitFormStep1 = ({
    isManeger,
    selectedPart,
    selectedDepartment,
    onSelect
}: RecruitFormStep1Props) => {
    const defaultStyle = {
        border: "1px solid #3A3A3A",
        background: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), 
        linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),  #232323`
    };
    const selectedStyle = {
        border: `1px solid #F70`,
        background: `#6B3200`
    };
    return (
        <div className="flex flex-col flex-1 bg-[#1B1B1B] text-white">
            <div className="flex-1 flex flex-col items-center justify-center px-[7.7%] pt-[32px] ">
                <div className="w-full flex flex-col items-center gap-[60px]">
                    <div className="w-full min-w-300">
                        {/* 파트 선택 */}
                        <h2 className="text-[32px] font-bold mb-10 self-start">파트 선택</h2>
                        <div className="flex flex-row gap-4 justify-between">
                            {PARTS.map((part) => (
                                <button
                                    style={selectedPart === part.id ? selectedStyle : defaultStyle}
                                    key={part.id}
                                    onClick={() => onSelect("part", part.id)}
                                    className={`flex-1 py-7 px-7 rounded-[12px] text-[32px] font-bold min-w-[230px] h-[128px]
                                border-[1px] flex flex-col items-start justify-center text-left
                                ${selectedPart === part.id ? "bg-[#6B3200] border-[#F70]" : ""}`}
                                >
                                    <span>{part.ko}</span>
                                    <span className="text-[20px] font-medium text-[#A7A7A7]">
                                        {part.en}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* 부서 선택 (운영진) */}
                    {isManeger && (
                        <div className="w-full min-w-300 pt-40">
                            <h2 className="text-[32px] font-bold mb-10">운영 분야 선택</h2>
                            <div className="flex flex-row gap-4 justify-between">
                                {DEPARTMENTS.map((dept) => (
                                    <button
                                        style={
                                            selectedDepartment === dept.id
                                                ? selectedStyle
                                                : defaultStyle
                                        }
                                        key={dept.id}
                                        onClick={() => onSelect("departmentType", dept.id)}
                                        className={`flex-1 py-7 px-7 rounded-[12px] text-[32px] font-bold min-w-[394px] h-[128px]
                                        border-[1px] flex flex-col items-start justify-center text-left`}
                                    >
                                        <span>{dept.ko}</span>
                                        <span className="text-[20px] font-medium text-[#fff]/60">
                                            {dept.en}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};
