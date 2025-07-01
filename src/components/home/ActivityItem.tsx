type ActivityItemProps = {
    tag: string;
    title: string;
    description: string;
    images: string[];
    visibleRatio?: number;
};
const getTagColor = (ratio: number) => {
    const clamp = Math.min(1, Math.max(0, ratio)); // 0~1로 제한
    const r = Math.round(58 * (1 - clamp) + 255 * clamp);
    const g = Math.round(58 * (1 - clamp) + 119 * clamp);
    const b = Math.round(58 * (1 - clamp) + 0 * clamp);
    return `rgb(${r}, ${g}, ${b})`;
};

const ActivityItem = ({ tag, title, description, images, visibleRatio = 1 }: ActivityItemProps) => {
    const opacity = 0.3 + 0.7 * visibleRatio;
    return (
        <div className={`flex w-full px-[18px] sm:px-8 mb-30 sm:mb-[400px] z-10`}>
            <div className={`flex  ${tag !== "" ? "h-[540px]" : "h-[30px]"}`}>
                {/* 태그 */}
                <div className="flex flex-col items-center pl-0 sm:pl-[113px] z-10  ">
                    {tag !== "" ? (
                        <div
                            className="bg-[#FF7700] w-13 sm:w-[71px] h-8 sm:h-[44px] text-black text-base sm:text-[20px] font-bold rounded-full flex text-center justify-center items-center leading-[100%] z-10"
                            style={{
                                backgroundColor:
                                    tag === "정기" ? "#FF7700" : getTagColor(visibleRatio),
                                transition: "all 0.3s",
                                opacity: 1,
                                filter: "none",
                                boxShadow:
                                    visibleRatio > 0.05
                                        ? `0 0 ${8 * visibleRatio}px 0 rgba(255, 119, 0, ${0.6 * visibleRatio}), 
           0 0 ${16 * visibleRatio}px 0 rgba(255, 119, 0, ${0.3 * visibleRatio})`
                                        : "none"
                            }}
                        >
                            {tag}
                        </div>
                    ) : (
                        <div
                            className="bg-[#B55400] w-4 sm:w-[17px] h-4 sm:h-[17px] rounded-full ml-[20.5px] sm:ml-[26.5px] mr-[22px] mt-[15px] z-10 "
                            style={{
                                backgroundColor: getTagColor(visibleRatio),
                                transition: "background-color 0.3s",
                                opacity: 1,
                                filter: "none"
                            }}
                        ></div>
                    )}
                </div>

                <div
                    className="pl-5 sm:pl-[34px]"
                    style={
                        tag === "정기"
                            ? {}
                            : {
                                  opacity,
                                  filter: `grayscale(${1 - visibleRatio})`,
                                  transition: "opacity 0.4s ease-out, filter 0.4s ease-out"
                              }
                    }
                >
                    {/* 텍스트 */}
                    <div className="flex items-start max-w-[1200px] mx-auto gap-8">
                        <div className="flex flex-col gap-3">
                            <h3 className={`text-base sm:text-[32px] font-semibold text-white `}>
                                {title}
                            </h3>
                            <div
                                className={`text-sm sm:text-[20px] sm:whitespace-pre-line ${tag !== "" ? "text-[#C4C4C4]" : "text-[#B55400]"}`}
                            >
                                {description}
                            </div>
                        </div>
                    </div>

                    {/* 이미지들 */}
                    {tag !== "" ? (
                        <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-6 mt-8 sm:mt-12 max-w-[1200px] mx-auto ">
                            {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`활동 이미지 ${i + 1}`}
                                    className="rounded-xl w-[253px] sm:w-[549px] h-[170px] sm:h-[380px] object-cover"
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ActivityItem;
