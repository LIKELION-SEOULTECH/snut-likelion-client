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
    onSearch: (filters: { part: string }) => void;
}

export const RecruitUserSearchTool = ({ onSearch }: MemberSearchToolProps) => {
    const [part, setPart] = useState("");

    const handleSearch = () => {
        onSearch({ part });
    };

    return (
        <div className="h-11 flex flex-row gap-2 justify-between items-center">
            <Select value={part} onValueChange={setPart}>
                <SelectTrigger className="w-[93px] bg-white rounded-sm !h-full data-[placeholder]:text-black whitespace-nowrap">
                    <SelectValue placeholder="파트별" />
                </SelectTrigger>
                <SelectContent className="rounded-sm w-[93px] min-w-0">
                    <SelectItem
                        value="frontend"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        프론트엔드
                    </SelectItem>
                    <SelectItem
                        value="backend"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        백엔드
                    </SelectItem>
                    <SelectItem
                        value="design"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        디자인
                    </SelectItem>
                    <SelectItem
                        value="plan"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        기획
                    </SelectItem>
                    <SelectItem
                        value="ai"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        AI
                    </SelectItem>
                </SelectContent>
            </Select>

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
