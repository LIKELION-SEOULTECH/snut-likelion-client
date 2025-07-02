import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ManagerData } from "@/types/recruit";
import { cn } from "@/libs/cn";

interface RecruitManagerItemProps {
    member: ManagerData;
    index: number;
}

export const RecruitManagerItem = ({ member, index }: RecruitManagerItemProps) => {
    const navigate = useNavigate();
    const [result, setResult] = useState<string>(member.result ?? "");

    const handleChange = (newResult: string) => {
        setResult(newResult);
        console.log(`지원자 ${member.id}의 결과를 ${newResult}로 변경`);
    };

    return (
        <div
            onClick={() => navigate(`/admin/recruit/result/manager/${member.id}`)}
            className={cn(
                "grid grid-cols-[60px_100px_1fr_120px_120px_120px_100px] h-[66px] items-center font-medium px-6 cursor-pointer",
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            )}
        >
            <span className="pl-[6px]">{member.id}</span>
            <span>{member.name}</span>
            <span>{member.email}</span>
            <span>{member.department}</span>
            <span>{member.part}</span>
            <span>{member.applyDate}</span>
            <span
                onClick={(e) => e.stopPropagation()} // Select 클릭 시 페이지 이동 방지
            >
                <Select value={result} onValueChange={handleChange}>
                    <SelectTrigger
                        isArrow={false}
                        className={cn(
                            "h-8 w-[90px] border-none shadow-none focus:ring-0 p-0 text-sm appearance-none bg-transparent pr-0 focus:outline-none focus:border-none",
                            result === "합격" && "text-[#ff7700]",
                            result === "불합격" && "text-[#EA3838]"
                        )}
                    >
                        <SelectValue placeholder="결과 선택" />
                    </SelectTrigger>
                    <SelectContent className="w-[90px] min-w-[90px]">
                        <SelectItem value="제출" className="w-[90px]">
                            제출
                        </SelectItem>
                        <SelectItem value="불합격" className="w-[90px]">
                            불합격
                        </SelectItem>
                        <SelectItem value="서류 합격" className="w-[90px] whitespace-nowrap">
                            서류 합격
                        </SelectItem>
                        <SelectItem value="합격" className="w-[90px]">
                            합격
                        </SelectItem>
                    </SelectContent>
                </Select>
            </span>
        </div>
    );
};
