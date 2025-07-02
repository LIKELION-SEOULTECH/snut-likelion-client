import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import QuoteDot from "@/assets//project/quote-dot.svg?react";
import { useQuery } from "@tanstack/react-query";
import { fetchSaying } from "@/apis/saying";

const quotes = [
    { saying: "일찍 일어나는 새가 피곤하다", username: "전민경" },
    {
        saying: "리더에게 희생은 불가결한 요소이지만, 그걸 희생이라고 느끼는 순간, 리더의 자질이 상실된다.",
        username: "Austin An"
    },
    { saying: "코드는 거짓말하지 않는다, 거짓말은 니가 하고 있다.", username: "정윤석" },
    { saying: "No 약자석. (3216번 버스 안, 78세 박순자 여사를 바라보며)", username: "안정후" },
    {
        saying: "올해라는 코스를 끝까지 완주해보도록 돕겠습니다. 아 물론 저는 부정출발 할 겁니다.",
        username: "안정후"
    }
];

export default function QuoteCardList() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { data: sayings } = useQuery({
        queryKey: ["saying"],
        queryFn: fetchSaying
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % quotes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getVisualIndex = (i: number) => {
        return (i - activeIndex + quotes.length) % quotes.length;
    };
    const combinedQuotes = [...(Array.isArray(sayings) ? sayings : []), ...quotes];
    console.log("✅ combinedQuotes:", combinedQuotes);

    return (
        <div className="relative w-full h-[111px] mx-auto mb-8">
            {combinedQuotes.map((quote, i) => {
                const vIndex = getVisualIndex(i);
                const topOffset = vIndex * 16;
                const scale = 1 - vIndex * 0.05;
                const opacity = vIndex > 2 ? 0 : 1;
                const zIndex = quotes.length - vIndex;
                const bgShades = ["bg-neutral-100", "bg-neutral-300", "bg-neutral-500"];

                return (
                    <motion.div
                        key={i}
                        className={`absolute w-full h-full p-7 rounded-xl shadow-md text-black ${bgShades[vIndex] ?? "bg-neutral-300"}`}
                        style={{ zIndex }}
                        animate={{
                            top: topOffset,
                            scale,
                            opacity,
                            y: 0
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <QuoteDot />
                            <div className="text-base text-orange-500 font-medium">
                                명언아카이브
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="font-medium">{quote.saying}</div>
                            <div className="text-base text-[#666666]">- {quote.username}</div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
