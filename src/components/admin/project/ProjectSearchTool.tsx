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

interface ProjectSearchToolProps {
    onSearch: (filters: { generation: string; keyword: string }) => void;
}

export const ProjectSearchTool = ({ onSearch }: ProjectSearchToolProps) => {
    const [generation, setGeneration] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        onSearch({ generation, keyword });
    };

    return (
        <div className="h-11 flex flex-row gap-2 items-center">
            {/* Generation */}
            <Select value={generation} onValueChange={setGeneration}>
                <SelectTrigger className="w-[86px] !h-full bg-white rounded-sm data-[placeholder]:text-black">
                    <SelectValue placeholder="기수별" />
                </SelectTrigger>
                <SelectContent className="rounded-sm w-[86px] min-w-0">
                    <SelectItem value="13기" className="w-[86px]">
                        13기
                    </SelectItem>
                    <SelectItem value="12기" className="w-[86px]">
                        12기
                    </SelectItem>
                </SelectContent>
            </Select>
            {/* Keyword Input */}
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="이름 검색"
                className="flex-1 bg-white !h-full rounded-sm"
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
