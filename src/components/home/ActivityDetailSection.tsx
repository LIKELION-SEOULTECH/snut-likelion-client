import ActivityItem from "./ActivityItem";
import { activityDetails } from "@/constants/ActivityDetails";
import { useEffect, useState, useRef } from "react";

export const ActivityDetailSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleRatios, setVisibleRatios] = useState<number[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const sectionTop = sectionRef.current.offsetTop;
            const y = window.scrollY;
            const relativeY = y - sectionTop;

            setScrollY(relativeY);

            const newRatios = itemRefs.current.map((el, index) => {
                if (!el) return 0;

                const rect = el.getBoundingClientRect();
                const visibleHeight =
                    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                let ratio = Math.max(0, Math.min(visibleHeight / rect.height, 1));

                if (activityDetails[index].tag === "정기") {
                    ratio = 1;
                }
                return ratio;
            });

            setVisibleRatios(newRatios);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // mount 시.. 1회 실행!!..
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="text-white relative pb-[200px] bg-[#1b1b1b]">
            {/* 태그 있는 선: 색변화 */}
            <div
                className="w-[1.5px] absolute left-[179px] top-[10px] z-10 pointer-events-none"
                style={{
                    height: `${
                        scrollY < 280
                            ? 280
                            : Math.min(scrollY / 1.3 > 500 ? scrollY * 1.3 : scrollY * 1.4, 3280)
                    }px`,
                    backgroundColor: "#FF7700",
                    maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                    transition: "height 0.15s ease-out"
                }}
            />

            {/* 태그 있는 선: 기본 */}
            <div className="w-[1.5px] h-[3280px] absolute left-[179px] top-[10px] z-0 bg-[#3A3A3A]" />

            {activityDetails.map((item, index) => (
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
                        visibleRatio={visibleRatios[index] ?? 0}
                    />
                </div>
            ))}
        </section>
    );
};
