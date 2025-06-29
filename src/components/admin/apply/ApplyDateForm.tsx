import { useState, useEffect, useCallback, useRef } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import QuestionChevDown from "@/assets/admin/question-chevdown.svg?react";
import QuestionChevUp from "@/assets/admin/question-chevup.svg?react";

export const ApplyDateForm = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [startDate, setStartDate] = useState({ year: "", month: "", day: "" });
    const [endDate, setEndDate] = useState({ year: "", month: "", day: "" });
    const [error, setError] = useState("");

    const todayRef = useRef(new Date());
    const today = todayRef.current;
    const thisYear = today.getFullYear();

    const handleToggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const isValidDate = (y: string, m: string, d: string) => {
        if (!y || !m || !d) return false;
        const date = new Date(+y, +m - 1, +d);
        return date.getFullYear() === +y && date.getMonth() + 1 === +m && date.getDate() === +d;
    };

    const isAfterToday = useCallback(
        (y: string, m: string, d: string) => {
            if (!isValidDate(y, m, d)) return false;
            const selected = new Date(+y, +m - 1, +d);
            return selected > today;
        },
        [today]
    );

    const isEndAfterStart = useCallback(() => {
        if (!isValidDate(startDate.year, startDate.month, startDate.day)) return false;
        if (!isValidDate(endDate.year, endDate.month, endDate.day)) return false;
        const start = new Date(+startDate.year, +startDate.month - 1, +startDate.day);
        const end = new Date(+endDate.year, +endDate.month - 1, +endDate.day);
        return end >= start;
    }, [startDate, endDate]);

    useEffect(() => {
        const allSelected =
            startDate.year &&
            startDate.month &&
            startDate.day &&
            endDate.year &&
            endDate.month &&
            endDate.day;

        if (!allSelected) return;

        if (!isAfterToday(startDate.year, startDate.month, startDate.day)) {
            setError("*오늘 이후의 날짜만 선택할 수 있습니다.");
        } else if (!isEndAfterStart()) {
            setError("*모집 마감일은 모집 시작일 이후로 설정해주세요.");
        } else {
            setError("");
        }
    }, [startDate, endDate, isAfterToday, isEndAfterStart]);

    const getDaysInMonth = (year: string, month: string) => {
        if (!year || !month) return [];
        const lastDay = new Date(+year, +month, 0).getDate();
        return Array.from({ length: lastDay }, (_, i) => String(i + 1).padStart(2, "0"));
    };

    const years = Array.from({ length: 5 }, (_, i) => `${thisYear + i}`);
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
    const startDays = getDaysInMonth(startDate.year, startDate.month);
    const endDays = getDaysInMonth(endDate.year, endDate.month);

    return (
        <div className="flex flex-col p-10 bg-white gap-2 mt-12 mb-10 rounded-sm">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={handleToggleCollapse}
            >
                <div className="text-xl font-semibold">서류 접수 기간</div>
                {isCollapsed ? <QuestionChevDown /> : <QuestionChevUp />}
            </div>

            {!isCollapsed && (
                <>
                    <div className="flex flex-row gap-2 items-center mt-10">
                        {/* 시작일 */}
                        <Select
                            value={startDate.year}
                            onValueChange={(v) => setStartDate((prev) => ({ ...prev, year: v }))}
                        >
                            <SelectTrigger className="w-[132px] !h-11 rounded-sm">
                                <SelectValue placeholder="년도" />
                            </SelectTrigger>
                            <SelectContent className="w-[132px] rounded-sm">
                                {years.map((y) => (
                                    <SelectItem key={y} value={y}>
                                        {y}년
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={startDate.month}
                            onValueChange={(v) =>
                                setStartDate((prev) => ({ ...prev, month: v, day: "" }))
                            }
                        >
                            <SelectTrigger className="w-[88px] !h-11 rounded-sm">
                                <SelectValue placeholder="월" />
                            </SelectTrigger>
                            <SelectContent className="w-[88px]">
                                {months.map((m) => (
                                    <SelectItem key={m} value={m}>
                                        {m}월
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={startDate.day}
                            onValueChange={(v) => setStartDate((prev) => ({ ...prev, day: v }))}
                        >
                            <SelectTrigger className="w-[88px] !h-11 rounded-sm">
                                <SelectValue placeholder="일" />
                            </SelectTrigger>
                            <SelectContent className="w-[88px]">
                                {startDays.map((d) => (
                                    <SelectItem key={d} value={d}>
                                        {d}일
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <span className="mx-2">-</span>

                        {/* 종료일 */}
                        <Select
                            value={endDate.year}
                            onValueChange={(v) => setEndDate((prev) => ({ ...prev, year: v }))}
                        >
                            <SelectTrigger className="w-[132px] !h-11 rounded-sm">
                                <SelectValue placeholder="년도" />
                            </SelectTrigger>
                            <SelectContent className="w-[132px]">
                                {years.map((y) => (
                                    <SelectItem key={y} value={y}>
                                        {y}년
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={endDate.month}
                            onValueChange={(v) =>
                                setEndDate((prev) => ({ ...prev, month: v, day: "" }))
                            }
                        >
                            <SelectTrigger className="w-[88px] !h-11 rounded-sm">
                                <SelectValue placeholder="월" />
                            </SelectTrigger>
                            <SelectContent className="w-[88px]">
                                {months.map((m) => (
                                    <SelectItem key={m} value={m}>
                                        {m}월
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={endDate.day}
                            onValueChange={(v) => setEndDate((prev) => ({ ...prev, day: v }))}
                        >
                            <SelectTrigger className="w-[88px] !h-11 rounded-sm">
                                <SelectValue placeholder="일" />
                            </SelectTrigger>
                            <SelectContent className="w-[88px]">
                                {endDays.map((d) => (
                                    <SelectItem key={d} value={d}>
                                        {d}일
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
                </>
            )}
        </div>
    );
};
