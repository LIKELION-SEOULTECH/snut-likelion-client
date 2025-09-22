import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

interface RecruitFormHeaderProps {
    isManeger: boolean;
    onNext: () => void;
    isValid: boolean;
    step: number;
}

export const RecruitFormHeader = ({ isManeger, onNext, isValid, step }: RecruitFormHeaderProps) => {
    const navigate = useNavigate();

    const handleLeave = () => {
        const confirmLeave = confirm("선택한 내용이 저장되지 않습니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            const target = isManeger ? "/recruitments/manager" : "/recruitments/member";
            navigate(target);
        }
    };

    const handleTempSave = () => {
        alert("임시 저장되었습니다!");
        //****채워야함.. ****//
    };

    const handleSubmit = () => {
        alert("지원서가 제출되었습니다!");
        navigate(ROUTES.MYPAGE);
        //****채워야한다.......****//
    };
    return (
        <div className="w-full h-24 bg-black flex justify-between items-center px-[110px] relative">
            {/* ← 나가기 버튼 */}
            <button
                onClick={handleLeave}
                className="bg-[#2D2D2D] text-[#A7A7A7] font-bold px-4 py-2 rounded-full"
            >
                ← 나가기
            </button>

            <div className="absolute bottom-0 left-0 w-full h-[0.6px] bg-gradient-to-r from-transparent via-white to-transparent opacity-100 pointer-events-none" />

            <div className="flex gap-3">
                {step === 1 ? (
                    <button
                        onClick={() => {
                            if (!isValid) {
                                alert("모든 항목을 선택해주세요.");
                                return;
                            }
                            onNext();
                        }}
                        className="bg-[#F70] text-white font-bold px-4 py-2 rounded-full"
                    >
                        다음
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleTempSave}
                            className="bg-[#000] text-[#A7A7A7] font-bold px-4 py-2 rounded-[120px] border-[1px] border-[#f70]"
                        >
                            임시저장
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-[#F70] text-white font-bold px-4 py-2 rounded-[120px]"
                        >
                            작성완료
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
