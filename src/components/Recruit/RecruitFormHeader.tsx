import { useNavigate } from "react-router-dom";

interface RecruitFormHeaderProps {
    isManeger: boolean;
    onNext: () => void;
    isValid: boolean;
}

export const RecruitFormHeader = ({ isManeger, onNext, isValid }: RecruitFormHeaderProps) => {
    const navigate = useNavigate();

    const handleLeave = () => {
        const confirmLeave = confirm("선택한 내용이 저장되지 않습니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            const target = isManeger ? "/recruitments/maneger" : "/recruitments/member";
            navigate(target);
        }
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

            {/* 다음 버튼 */}
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
        </div>
    );
};
