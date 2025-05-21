import { FAQBlock } from "./FAQBlock";
import { FAQList } from "@/constants/home/FAQList";
import { useState } from "react";

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="flex flex-col pt-[360px] w-full items-center text-[#ffffff] bg-[#1b1b1b] pb-[200px] gap-3 ">
            <h1 className="text-[56px] pb-[72px] font-semibold">자주 묻는 질문</h1>

            {FAQList.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className="flex flex-col gap-2 ">
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
                ${isOpen ? "transition-all duration-900 ease-out  max-h-[500px] opacity-100 py-[16px]" : "max-h-0 opacity-0 py-0"}`}
                        >
                            <FAQBlock tag="A" content={faq.A} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
