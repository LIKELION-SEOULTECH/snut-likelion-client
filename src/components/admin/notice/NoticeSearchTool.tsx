import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "@/assets/admin/search-icon.svg?react";
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
            <div className="relative flex-1 h-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <SearchIcon />
                </div>
                {/* Keyword Input */}
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="이름 검색"
                    className="w-full bg-gray-0 !h-full rounded-sm pl-10"
                />
            </div>
            {/* Search Button */}
            <Button
                onClick={handleSearch}
                className="w-[161px] medium-14 bg-gray-500 text-white !h-full rounded-sm"
            >
                검색하기
            </Button>
        </div>
    );
};
