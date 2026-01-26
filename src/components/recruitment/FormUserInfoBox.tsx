import type { FormDataType } from "@/pages/main/RecruitForm";
import { FormBox } from "./FormBox";

interface FormUserInfoBoxProps {
    name: string;
    major: string;
    studentId: string;
    phoneNumber: string;
    inSchool: boolean;
    grade: number;
    onChange: (field: keyof FormDataType, value: string | number | boolean) => void;
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

export const FormUserInfoBox = ({
    name,
    major,
    studentId,
    phoneNumber,
    grade,
    inSchool,
    onChange
}: FormUserInfoBoxProps) => {
    return (
        <FormBox>
            <div className="flex flex-col gap-6 text-[#C4C4C4]">
                {/* 이름 */}
                <div className="w-[850px] flex  items-center">
                    <label className="w-[160px] flex align-center">이름</label>
                    <input
                        placeholder="이름"
                        value={name}
                        onChange={(e) => onChange("username", e.target.value)}
                        className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black"
                    />
                </div>
                {/* 학과 */}
                <div className="w-[850px] flex  items-center">
                    <label className="w-[160px] flex align-center">학과</label>
                    <input
                        placeholder="학과"
                        value={major}
                        onChange={(e) => onChange("major", e.target.value)}
                        className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black"
                    />
                </div>
                {/* 학번 */}
                <div className="w-[850px] flex  items-center">
                    <label className="w-[160px] flex align-center">학번</label>
                    <input
                        placeholder="학번"
                        value={studentId}
                        onChange={(e) => onChange("studentId", e.target.value)}
                        className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black"
                    />
                </div>
                {/* 핸드폰 번호 */}
                <div className="w-[850px] flex  items-center">
                    <label className="w-[160px] flex align-center">핸드폰 번호</label>
                    <input
                        placeholder="핸드폰 번호"
                        value={phoneNumber}
                        onChange={(e) => onChange("phoneNumber", e.target.value)}
                        className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black"
                    />
                </div>
                <div className="w-[850px] flex items-center">
                    <label className="w-[160px] ">학년 (올해기준)</label>
                    <div className="flex gap-6">
                        {[1, 2, 3, 4].map((num) => (
                            <label
                                key={num}
                                className={`flex items-center gap-2 font-semibold cursor-pointer ${
                                    grade === num ? "text-white" : "text-[#C4C4C4]"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="grade"
                                    value={num}
                                    checked={grade === num}
                                    onChange={() => onChange("grade", num)}
                                    className={radioStyle}
                                />
                                {num}학년
                            </label>
                        ))}
                    </div>
                </div>

                {/* 재학 상태 선택 */}
                <div className="w-[850px] flex items-center">
                    <label className="w-[160px]">학적 상태</label>
                    <div className="flex gap-6">
                        {[
                            { label: "재학생", value: true },
                            { label: "휴학생", value: false }
                        ].map(({ label: text, value }) => (
                            <label
                                key={String(value)}
                                className={`flex items-center gap-2 font-semibold cursor-pointer ${
                                    inSchool === value ? "text-white" : "text-[#C4C4C4]"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="inSchool"
                                    value={String(value)}
                                    checked={inSchool === value}
                                    onChange={() => onChange("inSchool", value)}
                                    className={radioStyle}
                                />
                                {text}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </FormBox>
    );
};
