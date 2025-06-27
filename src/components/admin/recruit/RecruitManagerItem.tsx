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
            className={`flex h-[66px] items-center font-medium cursor-pointer ${
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            }`}
        >
            <span className="flex-[1] pl-[30px] text-left">{member.id}</span>
            <span className="flex-[1] text-left">{member.name}</span>
            <span className="flex-[3.5] text-left">{member.email}</span>
            <span className="flex-[1] text-left">{member.department}</span>
            <span className="flex-[1] text-left">{member.part}</span>
            <span className="flex-[1.5] text-left">{member.applyDate}</span>
            <span
                className="flex-[1] text-left"
                onClick={(e) => e.stopPropagation()} // Select 클릭 시 페이지 이동 방지
            >
                <Select value={result} onValueChange={handleChange}>
                    <SelectTrigger
                        isArrow={false}
                        className={cn(
                            "h-8 w-[90px] border-none shadow-none focus:ring-0 p-0 text-sm appearance-none bg-transparent pr-0 focus:outline-none focus:border-none",
                            result === "합격" && "text-[#ff7700]"
                        )}
                    >
                        <SelectValue placeholder="결과 선택" />
                    </SelectTrigger>
                    <SelectContent className="w-[90px] min-w-[90px]">
                        <SelectItem value="합격" className="w-[90px]">
                            합격
                        </SelectItem>
                        <SelectItem value="불합격" className="w-[90px]">
                            불합격
                        </SelectItem>
                    </SelectContent>
                </Select>
            </span>
        </div>
    );
};
