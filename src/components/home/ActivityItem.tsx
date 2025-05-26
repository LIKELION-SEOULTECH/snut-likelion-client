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
        <div className={`flex w-full px-8 mb-[400px] z-10`}>
            <div className={`flex  ${tag !== "" ? "h-[540px]" : "h-[30px]"}`}>
                {/* 태그 */}
                <div className="flex flex-col items-center pl-[113px] z-10  ">
                    {tag !== "" ? (
                        <div
                            className="bg-[#FF7700] w-[71px] h-[44px] text-black text-[20px] font-bold rounded-full flex text-center justify-center items-center leading-[100%] z-10"
                            style={{
                                backgroundColor:
                                    tag === "정기" ? "#FF7700" : getTagColor(visibleRatio),
                                transition: "background-color 0.3s",
                                opacity: 1,
                                filter: "none"
                            }}
                        >
                            {tag}
                        </div>
                    ) : (
                        <div className="bg-[#B55400] w-[17px] h-[17px] rounded-full ml-[26.5px] mr-[22px] mt-[15px] z-10 "></div>
                    )}
                </div>

                <div
                    className="pl-[34px]"
                    style={{
                        opacity,
                        filter: `grayscale(${1 - visibleRatio})`,
                        transition: "opacity 0.4s ease-out, filter 0.4s ease-out"
                    }}
                >
                    {/* 텍스트 */}
                    <div className="flex items-start max-w-[1200px] mx-auto gap-8">
                        <div className="flex flex-col gap-3">
                            <h3
                                className={`text-[32px] font-semibold text-white `}
                                style={
                                    tag === "정기"
                                        ? {
                                              color: "#FFFFFF",
                                              opacity: 1,
                                              filter: "none"
                                          }
                                        : {}
                                }
                            >
                                {title}
                            </h3>
                            <p
                                className={`text-[20px] whitespace-pre-line ${tag !== "" ? "text-[#C4C4C4]" : "text-[#B55400]"}`}
                            >
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* 이미지들 */}
                    {tag !== "" ? (
                        <div className="flex justify-start gap-6 mt-12 max-w-[1200px] mx-auto ">
                            {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`활동 이미지 ${i + 1}`}
                                    className="rounded-xl w-[549px] h-[380px] object-cover"
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
