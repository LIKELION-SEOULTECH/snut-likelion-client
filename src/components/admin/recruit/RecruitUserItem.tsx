import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UserData } from "@/types/recruit";
import { cn } from "@/libs/cn";
interface RecruitManagerItemProps {
    member: UserData;
    index: number;
}

export const RecruitUserItem = ({ member, index }: RecruitManagerItemProps) => {
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
                "grid grid-cols-[60px_100px_1fr_120px_120px_100px] h-[66px] items-center font-medium px-6 cursor-pointer",
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            )}
        >
            <span className="pl-[6px]">{member.id}</span>
            <span>{member.name}</span>
            <span>{member.email}</span>
            <span>{member.part}</span>
            <span>{member.applyDate}</span>
            <span onClick={(e) => e.stopPropagation()}>
                <Select value={result} onValueChange={handleChange}>
                    <SelectTrigger
                        isArrow={false}
                        className={cn(
                            "h-8 border-none shadow-none focus:ring-0 px-[9px] py-[7px] text-sm appearance-none bg-transparent focus:outline-none focus:border-none hover:bg-[#ECECEC]",
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
