type ActivityItemProps = {
    tag: string;
    title: string;
    description: string;
    images: string[];
};

const ActivityItem = ({ tag, title, description, images }: ActivityItemProps) => {
    return (
        <div className="flex w-full px-8 mb-[400px]">
            <div className=" flex h-[540px]">
                {/* 태그 */}
                <div className="flex flex-col items-center pl-[113px]  ">
                    <div className="bg-[#FF7700] w-[71px] h-[44px] text-black text-[20px] font-bold rounded-full flex text-center justify-center items-center leading-[100%] shadow-[0_0_16px_rgba(255,119,0,0.3),_0_0_8px_rgba(255,119,0,0.6)] z-10">
                        {tag}
                    </div>
                </div>

                <div className="pl-[34px]">
                    {/* 텍스트 */}
                    <div className="flex items-start max-w-[1200px] mx-auto gap-8">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[32px] font-semibold text-white">{title}</h3>
                            <p className="text-[20px] text-[#C4C4C4] whitespace-pre-line">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* 이미지들 */}
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
                </div>
            </div>
        </div>
    );
};

export default ActivityItem;
