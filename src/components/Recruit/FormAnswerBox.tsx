import { FormBox } from "./FormBox";

interface QuestionItem {
    questionId: number;
    label: string;
    answer: string;
}

interface AnswerBoxProps {
    questions: QuestionItem[];
    onChange: (questionId: number, answer: string) => void;
}

export const AnswerBox = ({ questions, onChange }: AnswerBoxProps) => {
    return (
        <div className="pb-[120px] ">
            {/* 여기 수정 필요 ->  백엔 연동하면서 ~~질문 이렇게 */}

            <FormBox>
                {questions.map((q, idx) => {
                    const currentLength = q.answer.length;
                    const isLastQ = idx === questions.length - 1;
                    return (
                        <div
                            key={q.questionId}
                            className={` w-[850px] text-4 relative  ${!isLastQ ? "mb-[40px]" : ""} font-medium`}
                        >
                            <p className="mb-6 ">{q.label}</p>
                            <textarea
                                className="w-full h-24 p-2 text-black placeholder-[#A7A7A7] bg-[#fff] rounded"
                                value={q.answer}
                                placeholder="편하고 솔직하게 답변해주세요 :-)"
                                onChange={(e) => onChange(q.questionId, e.target.value)}
                                maxLength={500}
                            />
                            <div className="absolute bottom-[10px] right-4 font-medium text-[#A7A7A7]">
                                {currentLength}/500
                            </div>
                        </div>
                    );
                })}
            </FormBox>
        </div>
    );
};
