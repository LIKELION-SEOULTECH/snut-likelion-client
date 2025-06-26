import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface MemberSearchToolProps {
    onSearch: (filters: { department: string; part: string }) => void;
}

export const RecruitManagerSearchTool = ({ onSearch }: MemberSearchToolProps) => {
    const [part, setPart] = useState("");
    const [department, setDepartment] = useState("");

    const handleSearch = () => {
        onSearch({ department, part });
    };

    return (
        <div className="h-11 flex flex-row gap-2 items-center justify-between">
            <div className="flex flex-row gap-[6px]">
                {/* Role */}
                <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="w-[93px] rounded-sm bg-white !h-full data-[placeholder]:text-black">
                        <SelectValue placeholder="부서별" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm w-[93px] min-w-0">
                        <SelectItem
                            value="운영부"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            운영부
                        </SelectItem>
                        <SelectItem
                            value="홍보부"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            홍보부
                        </SelectItem>
                        <SelectItem
                            value="학술부"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            학술부
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select value={part} onValueChange={setPart}>
                    <SelectTrigger className="w-[135px] bg-white rounded-sm !h-full data-[placeholder]:text-black whitespace-nowrap">
                        <SelectValue placeholder="파트별" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm w-[135px] min-w-0">
                        <SelectItem
                            value="프론트엔드"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            프론트엔드
                        </SelectItem>
                        <SelectItem
                            value="백엔드"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            백엔드
                        </SelectItem>
                        <SelectItem
                            value="디자인"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            디자인
                        </SelectItem>
                        <SelectItem
                            value="기획"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            기획
                        </SelectItem>
                        <SelectItem
                            value="AI"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            AI
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {/* Search Button */}
            <Button
                onClick={handleSearch}
                className="w-[161px] text-sm bg-[#404040] text-white !h-full rounded-sm"
            >
                검색하기
            </Button>
        </div>
    );
};
