import ActivityItem from "./ActivityItem";
import { activityDetails } from "@/constants/ActivityDetails";

export const ActivityDetailSection = () => {
    return (
        <section className="pt-[260px] bg-black text-white">
            <div className="flex w-full px-8">
                <div
                    className="w-[1px] h-[3280px] absolute left-[179px] top-[270px] z-0"
                    style={{
                        background: "linear-gradient(to bottom, #FF7700 0%, #3A3A3A 14.2%)"
                    }}
                ></div>
            </div>

            {activityDetails.map((item, index) => (
                <div key={index}>
                    <ActivityItem
                        tag={item.tag}
                        title={item.title}
                        description={item.description}
                        images={item.images}
                    />

                    {/* 1번째 아이템 뒤..글? */}
                    {index === 0 && (
                        <div className="flex w-full px-8 items-start mb-[400px]">
                            <div className="bg-[#B55400] w-[17px] h-[17px] rounded-full flex ml-[139px]  mt-[5px] z-10"></div>
                            <div className="flex text-[20px] text-[#B55400] pl-[55px]">
                                정기 세션과 스터디를 통해 기초 역량을 쌓은 후, 본격적인 팀
                                프로젝트에 참여하며 실전 경험을 쌓아갑니다.
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};
