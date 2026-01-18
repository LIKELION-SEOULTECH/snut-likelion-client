export const ProjectBoxSkeleton = () => {
    return (
        <div className="relative rounded-[16px]">
            <div className="w-60 sm:w-[395px] h-[170px] sm:h-[286px] rounded-[9.6px] sm:rounded-[16px] bg-[#2D2D2D] animate-pulse overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-[#2D2D2D] via-[#3A3A3A] to-[#2D2D2D] animate-[pulse_1.5s_ease-in-out_infinite]" />
            </div>
        </div>
    );
};
