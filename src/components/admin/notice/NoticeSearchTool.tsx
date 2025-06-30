// components/admin/MemberSearchTool.tsx

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NoticeSearchToolProps {
    onSearch: (filters: { keyword: string }) => void;
}

export const NoticeSearchTool = ({ onSearch }: NoticeSearchToolProps) => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        onSearch({ keyword });
    };

    return (
        <div className="h-11 flex flex-row gap-2 items-center">
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
