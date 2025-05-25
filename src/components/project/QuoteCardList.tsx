import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import QuoteDot from "@/assets//project/quote-dot.svg?react";

const quotes = [
    { text: "일찍 일어나는 새가 피곤하다", author: "전민경" },
    {
        text: "리더에게 희생은 불가결한 요소이지만, 그걸 희생이라고 느끼는 순간, 리더의 자질이 상실된다.",
        author: "Austin An"
    },
    { text: "코드는 거짓말하지 않는다, 거짓말은 니가 하고 있다.", author: "정윤석" },
    { text: "하나부터 열까지, 모든 게 다 한 수 위.", author: "TOP" }
];

export default function QuoteCardList() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % quotes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getVisualIndex = (i: number) => {
        return (i - activeIndex + quotes.length) % quotes.length;
    };

    return (
        <div className="relative w-full h-[111px] mx-auto mt-24 mb-8">
            {quotes.map((quote, i) => {
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
                            <div className="font-medium">{quote.text}</div>
                            <div className="text-base text-gray-400">- {quote.author}</div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
