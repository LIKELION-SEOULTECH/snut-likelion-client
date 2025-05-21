import ActivityItem from "./ActivityItem";
import { activityDetails } from "@/constants/ActivityDetails";
import { useEffect, useState, useRef } from "react";

export const ActivityDetailSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const gradientHeight = Math.min(300 + scrollY * 1.2, 3280);

    return (
        <section className="pt-[260px] text-white">
            <div className="flex w-full px-8">
                {/* 태그 있는 선: 색변화*/}
                <div
                    className="w-[2px]  h-[3280px] absolute left-[179px] top-[270px] z-1"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, #FF7700 0%, #3A3A3A 100%)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `200% ${gradientHeight}px`,
                        backgroundPosition: "top",
                        transition: "background-size 0.1s ease-out"
                    }}
                ></div>
                {/* 태그 있는 선: 기본 */}
                <div
                    className="w-[2px]  h-[3280px] absolute left-[179px] top-[270px] z-0"
                    style={{
                        background: " #3A3A3A "
                    }}
                ></div>
            </div>

            {activityDetails.map((item, index) => {
                return (
                    <div
                        key={index}
                        ref={(el: HTMLDivElement | null) => {
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
                                if (!el) return 0;
                                const rect = el.getBoundingClientRect();
                                const visibleHeight =
                                    Math.min(rect.bottom, window.innerHeight) -
                                    Math.max(rect.top, 0);
                                const ratio = Math.max(0, Math.min(visibleHeight / rect.height, 1));
                                return ratio;
                            })()}
                        />
                    </div>
                );
            })}
        </section>
    );
};
