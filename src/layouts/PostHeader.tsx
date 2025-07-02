interface PostHeaderProps {
    isUploadEnabled: boolean;
    onSubmit: () => void;
    onClick: () => void;
}

export const PostHeader = ({ isUploadEnabled, onSubmit, onClick }: PostHeaderProps) => {
    return (
        <div className="w-full h-24 flex flex-row items-center px-28 shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
            <div className="w-full h-11 flex flex-row justify-between">
                <button
                    className="w-[93px] h-full rounded-full bg-[#ECECEC] text-[#666666] font-medium px-4 cursor-pointer"
                    onClick={onClick}
                >
                    ← 나가기
                </button>
                <div className="flex flex-row gap-[13px]">
                    <button
                        className={`h-full min-w-20 text-[#FF7700] ${
                            isUploadEnabled
                                ? "bg-[#FFF1E6] font-medium rounded-full px-4 cursor-pointer"
                                : "font-medium cursor-not-allowed"
                        }`}
                    >
                        임시저장
                    </button>
                    <button
                        className={`h-full rounded-full px-4 cursor-pointer font-medium transition-colors ${
                            isUploadEnabled
                                ? "text-[white] bg-[#FF7700] cursor-pointer"
                                : "text-white bg-[#FFC08A] cursor-not-allowed"
                        }`}
                        disabled={!isUploadEnabled}
                        onClick={onSubmit}
                    >
                        업로드
                    </button>
                </div>
            </div>
        </div>
    );
};
