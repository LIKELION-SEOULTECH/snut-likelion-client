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
    { ko: "프론트엔드", en: "Frontend", id: "FRONTEND" },
    { ko: "백엔드", en: "Backend", id: "BACKEND" },
    { ko: "인공지능", en: "AI", id: "AI" }
];

const MOBILE_PART_TOP = [
    { ko: "기획자", en: "Planner", id: "PLANNING" },
    { ko: "디자이너", en: "Designer", id: "DESIGN" },
    { ko: "프론트엔드", en: "Frontend", id: "FRONTEND" }
];

const MOBILE_PART_BOTTOM = [
    { ko: "백엔드", en: "Backend", id: "BACKEND" },
    { ko: "인공지능", en: "AI", id: "AI" }
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

const MOBILE_DEPARTMENTS_TOP = [
    { ko: "학술부", en: "Academic Department", id: "ACADEMIC" },
    { ko: "홍보부", en: "Public Relations Department", id: "MARKETING" }
];
const MOBILE_DEPARTMENTS_BOTTOM = [
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
            <div className="flex-1 flex flex-col items-center sm:justify-center px-5 sm:mx-[7.7%] pt-10 sm:pt-[32px] ">
                <div className="w-full flex flex-col items-center gap-[60px]">
                    <div className="w-full sm:min-w-300">
                        {/* 파트 선택 */}
                        <h2 className="text-[20px] sm:text-[32px] font-bold mb-9 sm:mb-10 self-start">
                            파트 선택
                        </h2>
                        <div className="hidden sm:flex flex-row gap-3 sm:gap-4 justify-between">
                            {PARTS.map((part) => (
                                <button
                                    style={selectedPart === part.id ? selectedStyle : defaultStyle}
                                    key={part.id}
                                    onClick={() => onSelect("part", part.id)}
                                    className={`flex-1 py-[13px] sm:py-7 px-3 sm:px-7 rounded-[5.45px] sm:rounded-[12px] text-[15px] sm:text-[32px] font-bold w-[104.67px] sm:min-w-[230px] h-[62px] sm:h-[128px]
                                border-[1px] flex flex-col items-start justify-center text-left
                                ${selectedPart === part.id ? "bg-[#6B3200] border-[#F70]" : ""}`}
                                >
                                    <span>{part.ko}</span>
                                    <span className="text-xs sm:text-[20px] font-medium text-[#A7A7A7]">
                                        {part.en}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* 모바일 파트선택  */}
                        <div className="flex flex-col gap-3 sm:hidden">
                            <div className="flex flex-row gap-3 sm:gap-4 justify-between">
                                {MOBILE_PART_TOP.map((part) => (
                                    <button
                                        style={
                                            selectedPart === part.id ? selectedStyle : defaultStyle
                                        }
                                        key={part.id}
                                        onClick={() => onSelect("part", part.id)}
                                        className={`w-[calc((100%-24px)/3)] max-w-[187px] aspect-[108/62] py-[13px] sm:py-7 px-3 sm:px-7 rounded-[8px] sm:rounded-[12px] text-[15px] sm:text-[32px] font-bold sm:min-w-[230px] sm:h-[128px]
                                border-[1px] flex flex-col items-start justify-between text-left
                                ${selectedPart === part.id ? "bg-[#6B3200] border-[#F70]" : ""}`}
                                    >
                                        <span>{part.ko}</span>
                                        <span className="text-xs sm:text-[20px] font-medium text-[#A7A7A7]">
                                            {part.en}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex sm:hidden flex-row gap-3 sm:gap-4 justify-center">
                                {MOBILE_PART_BOTTOM.map((part) => (
                                    <button
                                        style={
                                            selectedPart === part.id ? selectedStyle : defaultStyle
                                        }
                                        key={part.id}
                                        onClick={() => onSelect("part", part.id)}
                                        className={`w-[calc((100%-24px)/3)] max-w-[187px] aspect-[108/62] py-[13px] sm:py-7 px-3 sm:px-7 rounded-[8px] sm:rounded-[12px] text-[15px] sm:text-[32px] font-bold sm:min-w-[230px] sm:h-[128px]
                                border-[1px] flex flex-col items-start justify-between text-left
                                ${selectedPart === part.id ? "bg-[#6B3200] border-[#F70]" : ""}`}
                                    >
                                        <span>{part.ko}</span>
                                        <span className="text-xs sm:text-[20px] font-medium text-[#A7A7A7]">
                                            {part.en}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 부서 선택 (운영진) */}
                    {isManeger && (
                        <div className="w-full sm:min-w-300 pt-10 sm:pt-40">
                            <h2 className="text-xl sm:text-[32px] font-bold mb-9 sm:mb-10">
                                운영 분야 선택
                            </h2>
                            {/* 운영진 분야 선택 */}
                            <div className="hidden sm:flex flex-row gap-4 justify-between">
                                {DEPARTMENTS.map((dept) => (
                                    <button
                                        style={
                                            selectedDepartment === dept.id
                                                ? selectedStyle
                                                : defaultStyle
                                        }
                                        key={dept.id}
                                        onClick={() => onSelect("departmentType", dept.id)}
                                        className={`flex-1 py-7 px-7 rounded-[12px] text-[32px] font-bold sm:min-w-[394px] sm:h-[128px]
                                        border-[1px] flex flex-col items-start justify-center text-left`}
                                    >
                                        <span>{dept.ko}</span>
                                        <span className="text-[20px] font-medium text-[#fff]/60">
                                            {dept.en}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex sm:hidden flex-col gap-3 mb-18">
                                {/* 운영진 부서 선택 모바일 */}
                                <div className="flex  flex-row gap-4 justify-between">
                                    {MOBILE_DEPARTMENTS_TOP.map((dept) => (
                                        <button
                                            style={
                                                selectedDepartment === dept.id
                                                    ? selectedStyle
                                                    : defaultStyle
                                            }
                                            key={dept.id}
                                            onClick={() => onSelect("departmentType", dept.id)}
                                            className={`w-[calc((100%-24px)/2)] aspect-[338/62] p-[13.56px] sm:p-7 rounded-[5.81px] sm:rounded-[12px] text-[13.56px] sm:text-[32px] font-bold sm:min-w-[394px] sm:h-[128px]
                                        border-[1px] flex flex-col items-start justify-center text-left`}
                                        >
                                            <span>{dept.ko}</span>
                                            <span className="text-[9.56px] sm:text-[20px] font-medium text-[#fff]/60">
                                                {dept.en}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex sm:hidden flex-row gap-4 justify-center">
                                    {MOBILE_DEPARTMENTS_BOTTOM.map((dept) => (
                                        <button
                                            style={
                                                selectedDepartment === dept.id
                                                    ? selectedStyle
                                                    : defaultStyle
                                            }
                                            key={dept.id}
                                            onClick={() => onSelect("departmentType", dept.id)}
                                            className={`w-[calc((100%-24px)/2)] max-w-[250px] aspect-[338/62] p-[13.56px] sm:p-7 rounded-[5.81px] sm:rounded-[12px] text-[13.56px] sm:text-[32px] font-bold sm:min-w-[394px] sm:h-[128px]
                                        border-[1px] flex flex-col items-start justify-center text-left`}
                                        >
                                            <span>{dept.ko}</span>
                                            <span className="text-[9.56px] sm:text-[20px] font-medium text-[#fff]/60">
                                                {dept.en}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};
