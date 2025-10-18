import { FAQBlock } from "./FAQBlock";
import { FAQList } from "@/constants/home/FAQList";
import { useState } from "react";

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="flex flex-col pt-10 w-full items-center text-[#ffffff] bg-[#1b1b1b] pb-25 sm:pb-[200px] sm:gap-3 ">
            <h2 className="text-xl sm:text-[56px] pb-8 sm:pb-[72px] font-semibold">
                자주 묻는 질문
            </h2>

            {FAQList.map((faq, index) => {
                const isOpen = openIndex === index;
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
                        <div
                            className={`overflow-hidden 
                ${isOpen ? "transition-[max-height] duration-700 ease-in max-h-[500px] opacity-100 py-0 sm:py-[12px] pb-2 sm:pb-0" : "max-h-0 opacity-0 py-0"}`}
                        >
                            <FAQBlock tag="A" content={faq.A} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
