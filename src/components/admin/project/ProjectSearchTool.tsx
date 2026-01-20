import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "@/assets/admin/search-icon.svg?react";
import { CustomSelect } from "../common/custom-select";
import type { ProjectFilter } from "@/types/project";

interface ProjectSearchToolProps {
    onSearch: (filters: ProjectFilter) => void;
}

export const ProjectSearchTool = ({ onSearch }: ProjectSearchToolProps) => {
    const [generation, setGeneration] = useState<number | null>(null);
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        onSearch({ generation, keyword });
    };

    return (
        <div className="h-11 flex flex-row gap-2 items-center">
            {/* Generation */}
            <div className="w-[86px]">
                <CustomSelect
                    value={generation}
                    placeholder={"기수별"}
                    onValueChange={setGeneration}
                    selectList={[
                        { label: "12기", value: 12 },
                        { label: "13기", value: 13 },
                        { label: "14기", value: 14 }
                    ]}
                />
            </div>
            <div className="relative flex-1 h-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <SearchIcon />
                </div>
                {/* Keyword Input */}
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="이름 검색"
                    className="flex-1 bg-white !h-full pl-10 rounded-sm border-gray-100 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                />
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
