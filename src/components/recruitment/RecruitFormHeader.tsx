interface RecruitFormHeaderProps {
    isManeger: boolean;
    onNext: () => void;
    onPrev: () => void;
    isValid: boolean;
    step: number;
    onTempSave: () => void;
    onSubmit: () => void;
    preview?: boolean;
    onHandleLeave: () => void;
    onValidationFail: (message: string) => void;
}

export const RecruitFormHeader = ({
    onNext,
    onPrev,
    isValid,
    step,
    onSubmit,
    onTempSave,
    preview,
    onHandleLeave,
    onValidationFail
}: RecruitFormHeaderProps) => {
    const handleLeave = () => {
        onHandleLeave();
    };

    return (
        <div className="w-full min-w-200 h-24 bg-black flex justify-between items-center px-[7%] relative">
            {/* ← 나가기 버튼 */}
            <div className="gap-4 flex">
                <button
                    onClick={handleLeave}
                    className="bg-[#2D2D2D] text-[#A7A7A7] font-bold px-4 py-2 rounded-full"
                >
                    ← 나가기
                </button>
                {!preview && step === 2 && (
                    <button
                        onClick={onPrev}
                        className=" text-[#A7A7A7] font-bold px-4 py-2 rounded-full border border-[#A7A7A7]"
                    >
                        ← 파트 선택
                    </button>
                )}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[0.6px] bg-gradient-to-r from-transparent via-white to-transparent opacity-100 pointer-events-none" />

            {!preview && (
                <div className="flex gap-3">
                    {step === 1 ? (
                        <button
                            onClick={() => {
                                if (!isValid) {
                                    onValidationFail("모든 항목을 선택해주세요.");
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
                                onClick={onTempSave}
                                className="bg-[#000] text-[#f70] font-bold px-4 py-2 rounded-[120px] border-[1px] border-[#f70]"
                            >
                                임시저장
                            </button>
                            <button
                                onClick={onSubmit}
                                className="bg-[#F70] text-white  font-bold px-4 py-2 rounded-[120px] border-[1px] border-[#f70]"
                            >
                                지원하기
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
