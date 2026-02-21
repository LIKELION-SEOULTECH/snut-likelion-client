import { FAQBlock } from "./FAQBlock";
import { FAQList } from "@/constants/home/FAQList";
import { useState } from "react";

export const FAQSection = () => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleOpen = (index: number) => {
        setOpenIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };
    return (
        <div className="flex flex-col pt-10 w-full items-center text-[#ffffff] bg-[#1b1b1b] pb-25 sm:pb-[200px] sm:gap-3 ">
            <h2 className="text-xl sm:text-[56px] pb-8 sm:pb-[72px] font-semibold">
                자주 묻는 질문
            </h2>

            {FAQList.map((faq, index) => {
                const isOpen = openIndexes.includes(index);

                return (
                    <div key={index} className="flex flex-col gap-2 sm:gap-0">
                        {/* Q */}
                        <FAQBlock
                            tag="Q"
                            content={faq.Q}
                            isOpen={isOpen}
                            onClick={() => toggleOpen(index)}
                        />

                        {/* A */}
                        <FAQAnswer isOpen={isOpen}>
                            <FAQBlock tag="A" content={faq.A} />
                        </FAQAnswer>
                    </div>
                );
            })}
        </div>
    );
};

import { useEffect, useRef } from "react";

const FAQAnswer = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        if (isOpen) {
            ref.current.style.height = `${ref.current.scrollHeight}px`;
            ref.current.style.opacity = "1";
        } else {
            ref.current.style.height = "0px";
            ref.current.style.opacity = "0";
        }
    }, [isOpen]);

    return (
        <div
            ref={ref}
            className="overflow-hidden transition-[height,opacity] duration-500 ease-in-out"
            style={{ height: 0, opacity: 0 }}
        >
            <div className="py-2 sm:pt-[12px] sm:pb-[0px]">{children}</div>
        </div>
    );
};
