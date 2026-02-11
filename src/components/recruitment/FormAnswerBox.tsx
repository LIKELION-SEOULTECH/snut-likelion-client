import { FormBox } from "./FormBox";

interface QuestionItem {
    questionId: number;
    label: string;
    answer: string;
    questionType: string;
    buttonList?: string[];
}

interface AnswerBoxProps {
    questions: QuestionItem[];
    readOnly?: boolean;
    onChange: (questionId: number, answer: string) => void;
}

const radioStyle = `
    appearance-none
    w-6 h-6
    rounded-full
    border-2 border-white
    flex items-center justify-center
    relative
    before:content-['']
    before:absolute
    before:w-3 before:h-3
    before:rounded-full
    before:bg-white
    before:scale-0
    before:transition-transform
    checked:before:scale-100
  `;

export const AnswerBox = ({ questions, onChange, readOnly }: AnswerBoxProps) => {
    return (
        <div className="pb-[120px] ">
            {/* 장문 */}
            <FormBox>
                {questions.map((q, idx) => {
                    const currentLength = q.answer.length;
                    const isLastQ = idx === questions.length - 1;
                    if (q.questionType === "LONG") {
                        return (
                            <div
                                key={q.questionId}
                                className={` max-w-[850px] text-4 relative  ${!isLastQ ? "mb-[40px]" : ""} font-medium`}
                            >
                                <p className="mb-6 ">{q.label}</p>
                                <textarea
                                    className="w-full h-24 p-2 text-black placeholder-[#A7A7A7] bg-[#fff] rounded"
                                    value={q.answer}
                                    placeholder="편하고 솔직하게 답변해주세요 :-)"
                                    onChange={(e) => onChange(q.questionId, e.target.value)}
                                    maxLength={500}
                                    disabled={readOnly}
                                />
                                <div className="absolute bottom-[10px] right-4 font-medium text-[#A7A7A7]">
                                    {currentLength}/500
                                </div>
                            </div>
                        );
                    }
                    // 라디오버튼
                    else if (q.questionType === "RADIO_BUTTON" && q.buttonList) {
                        return (
                            <div
                                className={`max-w-[850px] flex items-center ${!isLastQ ? "mb-6" : ""} `}
                                key={q.questionId}
                            >
                                <label className="w-[160px] ">{q.label}</label>
                                <div className="flex gap-6">
                                    {q.buttonList.map((val) => (
                                        <label
                                            key={val}
                                            className={`flex items-center gap-2 font-semibold cursor-pointer ${
                                                q.answer === val ? "text-white" : "text-[#C4C4C4]"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={q.questionId.toString()}
                                                value={val}
                                                checked={q.answer === val}
                                                onChange={() => onChange(q.questionId, val)}
                                                className={radioStyle}
                                                disabled={readOnly}
                                            />
                                            {val}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    } else if (q.questionType === "SHORT") {
                        return (
                            <div
                                className={`max-w-[850px] flex items-center ${!isLastQ ? "mb-6" : ""} `}
                                key={q.questionId}
                            >
                                <label className="w-[160px] flex align-center">{q.label}</label>
                                <input
                                    placeholder="답변을 입력해주세요"
                                    value={q.answer}
                                    onChange={(e) => onChange(q.questionId, e.target.value)}
                                    className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black"
                                    disabled={readOnly}
                                />
                            </div>
                        );
                    }
                })}
            </FormBox>
        </div>
    );
};
