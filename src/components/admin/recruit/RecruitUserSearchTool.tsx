// components/admin/MemberSearchTool.tsx

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
    onSearch: (filters: { result: string; part: string }) => void;
}

export const RecruitUserSearchTool = ({ onSearch }: MemberSearchToolProps) => {
    const [part, setPart] = useState("");
    const [result, setResult] = useState("");

    const handleSearch = () => {
        onSearch({ result, part });
    };

    return (
        <div className="h-11 flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-row gap-2">
                {/* 결과별 */}
                <Select value={result} onValueChange={setResult}>
                    <SelectTrigger className="w-[135px] px-4 bg-white rounded-sm !h-11 data-[placeholder]:text-black whitespace-nowrap">
                        <SelectValue placeholder="결과별" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm w-[135px] min-w-0">
                        <SelectItem
                            value="제출"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            제출
                        </SelectItem>
                        <SelectItem
                            value="불합격"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            불합격
                        </SelectItem>
                        <SelectItem
                            value="서류 합격"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            서류 합격
                        </SelectItem>
                        <SelectItem
                            value="합격"
                            className="whitespace-nowrap data-[state=checked]:font-bold"
                        >
                            합격
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* 파트별 */}
                <Select value={part} onValueChange={setPart}>
                    <SelectTrigger className="w-[135px] px-4 bg-white rounded-sm !h-11 data-[placeholder]:text-black whitespace-nowrap">
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
                className="w-52 text-sm bg-[#404040] text-white !h-full rounded-sm"
            >
                지원서 일괄 다운로드 받기
            </Button>
        </div>
    );
};
