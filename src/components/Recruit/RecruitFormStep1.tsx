import { Footer } from "@/layouts/Footer";

interface RecruitFormStep1Props {
    isManeger: boolean;
    selectedPart: string;
    selectedDepartment: string;
    onSelect: (field: "part" | "departmentType", value: string) => void;
    onNext: () => void;
}

const PARTS = [
    { ko: "기획자", en: "Planner" },
    { ko: "디자이너", en: "Designer" },
    { ko: "프론트엔드", en: "Front-end" },
    { ko: "백엔드", en: "Back-end" },
    { ko: "인공지능", en: "A.I" }
];

// const DEPARTMENTS = ["학술부", "홍보부", "운영부"];
const DEPARTMENTS = [
    { ko: "학술부", en: "Academic Department" },
    { ko: "홍보부", en: "Public Relations Department" },
    {
        ko: "운영부",
        en: "Operations Department"
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
        <div className="flex flex-col min-h-screen w-full bg-[#1B1B1B] text-white">
            <div className="flex-1 flex flex-col items-center justify-center px-[110px] w-full">
                {/* 파트 선택 */}
                <h2 className="text-[32px] font-bold mb-10 self-start">파트 선택</h2>
                <div className="grid grid-cols-5 gap-4 mb-[120px]">
                    {PARTS.map((part) => (
                        <button
                            style={selectedPart === part.ko ? selectedStyle : defaultStyle}
                            key={part.ko}
                            onClick={() => onSelect("part", part.ko)}
                            className={`py-7 px-7 rounded-[12px] text-[32px] font-bold w-[230px] h-[128px]
                                border-[1px] flex flex-col items-start justify-center text-left
                                ${selectedPart === part.ko ? "bg-[#6B3200] border-[#F70]" : ""}`}
                        >
                            <span>{part.ko}</span>
                            <span className="text-[20px] font-medium text-[#A7A7A7]">
                                {part.en}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 부서 선택 (운영진) */}
                {isManeger && (
                    <div className="w-full">
                        <h2 className="text-[32px] font-bold mb-10">운영 분야 선택</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {DEPARTMENTS.map((dept) => (
                                <button
                                    style={
                                        selectedDepartment === dept.ko
                                            ? selectedStyle
                                            : defaultStyle
                                    }
                                    key={dept.ko}
                                    onClick={() => onSelect("departmentType", dept.ko)}
                                    className={`py-7 px-7 rounded-[12px] text-[32px] font-bold w-[394px] h-[128px]
                                        border-[1px] flex flex-col items-start justify-center text-left`}
                                >
                                    <span>{dept.ko}</span>
                                    <span className="text-[20px] font-medium text-[#A7A7A7]">
                                        {dept.en}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-[#1B1B1B]">
                <Footer />
            </div>
        </div>
    );
};
