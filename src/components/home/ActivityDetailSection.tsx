import ActivityItem from "./ActivityItem";
import { activityDetails } from "@/constants/ActivityDetails";
import { useEffect, useState, useRef } from "react";

export const ActivityDetailSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            setScrollY(container.scrollTop);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="text-white">
            <div
                ref={scrollRef}
                className="pt-[260px] pb-[100px]  max-h-[100vh] overflow-y-scroll relative"
            >
                {/* 태그 있는 선: 색변화 */}
                <div
                    className="w-[2px] absolute left-[179px] top-[270px] z-10 pointer-events-none"
                    style={{
                        height: `${
                            scrollY === 0 || scrollY < 150
                                ? 150
                                : Math.min(
                                      scrollY / 1.3 > 1000 ? scrollY * 1.15 : scrollY * 1.4,
                                      3280
                                  )
                        }px`,
                        backgroundColor: "#FF7700",
                        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                        transition: "height 0.15s ease-out"
                    }}
                />
                {/* 태그 있는 선: 기본 */}
                <div className="w-[2px] h-[3280px] absolute left-[179px] top-[270px] z-0 bg-[#3A3A3A]" />

                {activityDetails.map((item, index) => {
                    return (
                        <div
                            key={index}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                        >
                            <ActivityItem
                                tag={item.tag}
                                title={item.title}
                                description={item.description}
                                images={item.images}
                                visibleRatio={(() => {
                                    const el = itemRefs.current[index];
                                    const container = scrollRef.current;
                                    if (!el || !container) return 0;

                                    const containerRect = container.getBoundingClientRect();
                                    const rect = el.getBoundingClientRect();

                                    const visibleHeight =
                                        Math.min(rect.bottom, containerRect.bottom) -
                                        Math.max(rect.top, containerRect.top);

                                    const ratio = Math.max(
                                        0,
                                        Math.min(visibleHeight / rect.height, 1)
                                    );

                                    return ratio;
                                })()}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
