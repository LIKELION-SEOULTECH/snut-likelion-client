// components/admin/MemberSearchTool.tsx

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MemberSearchToolProps {
    onSearch: (filters: {
        generation: string;
        part: string;
        role: string;
        keyword: string;
    }) => void;
}

export const MemberSearchTool = ({ onSearch }: MemberSearchToolProps) => {
    const [generation, setGeneration] = useState("");
    const [part, setPart] = useState("");
    const [role, setRole] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        onSearch({ generation, part, role, keyword });
    };

    return (
        <div className="h-11 flex flex-row gap-2 items-center">
            {/* Generation */}
            <Select value={generation} onValueChange={setGeneration}>
                <SelectTrigger className="w-[86px] !h-full bg-white rounded-sm data-[placeholder]:text-black">
                    <SelectValue placeholder="기수별" />
                </SelectTrigger>
                <SelectContent className="rounded-sm w-[86px] min-w-0">
                    <SelectItem value="13" className="w-[86px]">
                        13기
                    </SelectItem>
                    <SelectItem value="12" className="w-[86px]">
                        12기
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select value={part} onValueChange={setPart}>
                <SelectTrigger className="w-[93px] bg-white rounded-sm !h-full data-[placeholder]:text-black whitespace-nowrap">
                    <SelectValue placeholder="파트별" />
                </SelectTrigger>
                <SelectContent className="rounded-sm w-[93px] min-w-0">
                    <SelectItem
                        value="FRONTEND"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        프론트엔드
                    </SelectItem>
                    <SelectItem
                        value="BACKEND"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        백엔드
                    </SelectItem>
                    <SelectItem
                        value="DESIGN"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        디자인
                    </SelectItem>
                    <SelectItem
                        value="PLANNING"
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

            {/* Role */}
            <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[86px] rounded-sm bg-white !h-full data-[placeholder]:text-black">
                    <SelectValue placeholder="역할" />
                </SelectTrigger>
                <SelectContent className="rounded-sm w-[86px] min-w-0">
                    <SelectItem
                        value="ROLE_ADMIN"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        대표
                    </SelectItem>
                    <SelectItem
                        value="ROLE_MANAGER"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        운영진
                    </SelectItem>
                    <SelectItem
                        value="ROLE_USER"
                        className="whitespace-nowrap data-[state=checked]:font-bold"
                    >
                        아기사자
                    </SelectItem>
                </SelectContent>
            </Select>

            {/* Keyword Input */}
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="이름 검색"
                className="w-[631px] bg-white !h-full rounded-sm"
            />

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
