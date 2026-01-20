import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "../common/custom-select";
import SearchIcon from "@/assets/admin/search-icon.svg?react";
import type { MemberFilter } from "@/types/member";

interface MemberSearchToolProps {
    onSearch: (filters: MemberFilter) => void;
}

export const MemberSearchTool = ({ onSearch }: MemberSearchToolProps) => {
    const [generation, setGeneration] = useState<number | null>(null);
    const [part, setPart] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        onSearch({ generation, part, role, keyword });
    };

    return (
        <div className="h-11 flex flex-row gap-2 items-center">
            {/* Generation */}
            <div className="w-[86px]">
                <CustomSelect
                    value={generation}
                    placeholder={"기수"}
                    onValueChange={setGeneration}
                    selectList={[
                        { label: "12기", value: 12 },
                        { label: "13기", value: 13 },
                        { label: "14기", value: 14 }
                    ]}
                />
            </div>

            {/* Part */}
            <div className="w-[122px]">
                <CustomSelect
                    value={part}
                    placeholder={"파트"}
                    onValueChange={setPart}
                    selectList={[
                        { label: "전체", value: "all" },
                        { label: "기획", value: "PLANNING" },
                        { label: "디자인", value: "DESIGN" },
                        { label: "AI", value: "AI" },
                        { label: "프론트엔드", value: "FRONTEND" },
                        { label: "백엔드", value: "BACKEND" }
                    ]}
                />
            </div>

            {/* Role */}
            <div className="w-[110px]">
                <CustomSelect
                    value={role}
                    placeholder={"역할"}
                    onValueChange={setRole}
                    selectList={[
                        { label: "운영진", value: "ROLE_MANAGER" },
                        { label: "아기사자", value: "ROLE_USER" }
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
                    className="min-w-100 w-full bg-white !h-full rounded-sm pl-10 border-gray-100 placeholder:text-gray-100 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
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
