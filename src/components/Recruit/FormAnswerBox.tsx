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
            <h4 className="text-[32px] text-[#FFF] font-bold mb-10">질문</h4>
            <FormBox>
                {questions.map((q) => (
                    <div key={q.questionId} className="mb-10 w-[850px]">
                        <p className="mb-6 font-bold">{q.label}</p>
                        <textarea
                            className="w-full h-24 p-2 text-black placeholder-[#A7A7A7] bg-[#fff] rounded"
                            value={q.answer}
                            placeholder="편하고 솔직하게 답변해주세요 :-)"
                            onChange={(e) => onChange(q.questionId, e.target.value)}
                        />
                    </div>
                ))}
            </FormBox>
        </div>
    );
};
