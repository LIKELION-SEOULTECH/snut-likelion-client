import { useNavigate } from "react-router-dom";

export const MyPageEdit = () => {
    const navigate = useNavigate();

    const handleLeave = () => {
        const confirmLeave = confirm("선택한 내용이 저장되지 않습니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            const target = "/mypage";
            navigate(target);
        }
    };

    const handleSubmit = () => {
        alert("수정 되었습니다 !");
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
                <button
                    onClick={handleSubmit}
                    className="bg-[#F70] text-white font-bold px-4 py-2 rounded-[120px]"
                >
                    수정완료
                </button>
            </div>
        </div>
    );
};
