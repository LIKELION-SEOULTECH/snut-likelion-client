import type { QNAItem } from "@/types/apply";

interface QuestionSectionProps {
    title: string;
    items: QNAItem[];
}

export const QuestionSection = ({ title, items }: QuestionSectionProps) => {
    if (items.length === 0) return null;

    return (
        <div className="flex flex-col pt-12 pb-2 px-15 bg-white text-black rounded-sm">
            <span className="text-xl font-semibold mb-6">{title}</span>

            {items.map((item) => (
                <div key={item.questionId} className="border-y-2 border-[#7f7f7f] mb-10">
                    {/* Q */}
                    <div className="flex gap-4 border-b border-[#7f7f7f] px-[30px] py-10 leading-relaxed">
                        <span className="flex pl-[30px] items-center w-[98px] font-medium">Q.</span>
                        <span className="flex-1">{item.questionText}</span>
                    </div>

                    {/* A */}
                    <div className="flex gap-4 px-[30px] py-10 leading-relaxed">
                        <span className="flex pl-[30px] items-center w-[98px] font-medium">A.</span>
                        <span className="flex-1 whitespace-pre-wrap">{item.answer}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
