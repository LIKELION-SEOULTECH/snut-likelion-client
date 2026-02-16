import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import TriggerClose from "@/assets/admin/trigger-close.svg?react";
import TriggerOpen from "@/assets/admin/trigger-open.svg?react";
import { useMemberPassStore, type KorApplicationStatus } from "@/stores/useMemberPassStore";
interface MemberSearchToolProps {
    onSearch: (filters: { result: string; part: string }) => void;
    checkedItemsOnPage: { id: number; status: KorApplicationStatus }[];
}

export const RecruitUserSearchTool = ({ onSearch, checkedItemsOnPage }: MemberSearchToolProps) => {
    const { isManageMode } = useRecruitManageStore();
    const { addMany } = useMemberPassStore();

    const [result, setResult] = useState("");
    const [part, setPart] = useState("");

    const handleSearch = () => {
        onSearch({ result, part });
    };

    const handlePassClick = () => {
        if (checkedItemsOnPage.length === 0) {
            alert("선택된 지원자가 없습니다.");
            return;
        }

        const status = checkedItemsOnPage[0].status;

        console.log("=================================");
        console.log("🎯 합격 버튼 클릭");
        console.log(
            "현재 페이지 체크된 id:",
            checkedItemsOnPage.map((i) => i.id)
        );
        console.log("기준 상태:", status);
        console.log("=================================");

        addMany(
            checkedItemsOnPage.map((i) => i.id),
            status
        );
    };

    // 엔터키 필터링
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div
            className="h-11 flex flex-row gap-2 justify-between items-center"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className="h-full flex flex-row gap-[6px]">
                {/* result */}
                <Select value={result} onValueChange={setResult}>
                    <SelectTrigger
                        isArrow={false}
                        className="min-w-[135px] !h-full pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                    >
                        <SelectValue placeholder="결과별" />
                        <span className="ml-auto flex items-center">
                            <TriggerClose className="icon-close size-2" />
                            <TriggerOpen className="icon-open size-2" />
                        </span>
                    </SelectTrigger>

                    <SelectContent className="w-[135px] min-w-[135px] rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                        <SelectItem
                            value="SUBMITTED"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            제출
                        </SelectItem>
                        <SelectItem
                            value="PAPER_PASS"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            서류 합격
                        </SelectItem>
                        <SelectItem
                            value="FAILED"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            불합격
                        </SelectItem>
                        <SelectItem
                            value="FINAL_PASS"
                            className="w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            최종 합격
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* part */}
                <Select value={part} onValueChange={setPart}>
                    <SelectTrigger
                        isArrow={false}
                        className="min-w-[135px] !h-full pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                    >
                        <SelectValue placeholder="파트별" />
                        <span className="ml-auto flex items-center">
                            <TriggerClose className="icon-close size-2" />
                            <TriggerOpen className="icon-open size-2" />
                        </span>
                    </SelectTrigger>

                    <SelectContent className="w-[135px] min-w-[135px] rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                        <SelectItem
                            value="기획"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            기획
                        </SelectItem>
                        <SelectItem
                            value="디자인"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            디자인
                        </SelectItem>
                        <SelectItem
                            value="AI"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            AI
                        </SelectItem>
                        <SelectItem
                            value="프론트엔드"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            프론트엔드
                        </SelectItem>
                        <SelectItem
                            value="백엔드"
                            className="w-[135px] min-w-[135px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                        >
                            백엔드
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isManageMode ? (
                <div className="h-full flex flex-row gap-3">
                    <Button
                        onClick={handlePassClick}
                        className="w-[103px] medium-14 bg-gray-500 text-gray-0 !h-full rounded-sm"
                    >
                        합격
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={handleSearch}
                    className="w-[153px] medium-14 bg-gray-500 text-gray-0 !h-full rounded-sm"
                >
                    지원서 다운로드
                </Button>
            )}
        </div>
    );
};
