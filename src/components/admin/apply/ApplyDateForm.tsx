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
import { createRecruitment, updateRecruitment } from "@/apis/admin/recruitment";
import TriggerClose from "@/assets/admin/trigger-close.svg?react";
import TriggerOpen from "@/assets/admin/trigger-open.svg?react";
import { CustomSelect } from "../common/custom-select";
import type { LatestRecruitment } from "@/types/recruitment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";

export const ApplyDateForm = ({
    latestRecruitment,
    recruitmentType
}: {
    latestRecruitment: LatestRecruitment;
    recruitmentType: string;
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [generation, setGeneration] = useState<number | null>(null);
    const [startDate, setStartDate] = useState({ year: "", month: "", day: "" });
    const [endDate, setEndDate] = useState({ year: "", month: "", day: "" });
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [recruitmentId, setRecruitmentId] = useState<number | null>(null);

    const todayRef = useRef(new Date());
    const today = todayRef.current;
    const thisYear = today.getFullYear();
    const queryClient = useQueryClient();

    const recruitmentMutation = useMutation({
        mutationFn: (payload: {
            id?: number;
            generation: number;
            recruitmentType: string;
            openDate: string;
            closeDate: string;
        }) => {
            return payload.id ? updateRecruitment(payload.id, payload) : createRecruitment(payload);
        },

        onSuccess: () => {
            toast(
                <div className="flex items-center gap-2">
                    <CircleCheck size={20} className="text-green-400" />
                    <span className="text-sm font-medium">기간 수정이 완료되었습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
            queryClient.invalidateQueries({
                queryKey: ["latestRecruitment", recruitmentType]
            });

            setIsEditing(false);
            console.log("모집 등록 성공");
        },

        onError: (err) => {
            console.error("모집 등록 실패", err);
        }
    });

    useEffect(() => {
        if (latestRecruitment) {
            const open = new Date(latestRecruitment.openDate);
            const close = new Date(latestRecruitment.closeDate);

            setRecruitmentId(latestRecruitment.id);

            setGeneration(latestRecruitment.generation);
            setStartDate({
                year: String(open.getFullYear()),
                month: String(open.getMonth() + 1).padStart(2, "0"),
                day: String(open.getDate()).padStart(2, "0")
            });
            setEndDate({
                year: String(close.getFullYear()),
                month: String(close.getMonth() + 1).padStart(2, "0"),
                day: String(close.getDate()).padStart(2, "0")
            });
        }
    }, [latestRecruitment]);

    const handleToggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const isValidDate = (y: string, m: string, d: string) => {
        if (!y || !m || !d) return false;
        const date = new Date(+y, +m - 1, +d);
        return date.getFullYear() === +y && date.getMonth() + 1 === +m && date.getDate() === +d;
    };

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

        if (!isEndAfterStart()) {
            setError("*모집 마감일은 모집 시작일 이후로 설정해주세요.");
        } else {
            setError("");
        }
    }, [startDate, endDate, isEndAfterStart]);

    const getDaysInMonth = (year: string, month: string) => {
        if (!year || !month) return [];
        const lastDay = new Date(+year, +month, 0).getDate();
        return Array.from({ length: lastDay }, (_, i) => String(i + 1).padStart(2, "0"));
    };

    const years = Array.from({ length: 5 }, (_, i) => `${thisYear + i}`);
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
    const startDays = getDaysInMonth(startDate.year, startDate.month);
    const endDays = getDaysInMonth(endDate.year, endDate.month);

    const handleSubmit = () => {
        if (!generation || error) return;

        const openDate = new Date(
            Date.UTC(Number(startDate.year), Number(startDate.month) - 1, Number(startDate.day))
        ).toISOString();

        const closeDate = new Date(
            Date.UTC(Number(endDate.year), Number(endDate.month) - 1, Number(endDate.day))
        ).toISOString();

        recruitmentMutation.mutate({
            id: recruitmentId ?? undefined,
            generation,
            recruitmentType,
            openDate,
            closeDate
        });
    };

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
                    {latestRecruitment && !isEditing ? (
                        <div className="flex items-center gap-10 mt-8">
                            <span className="flex flex-row text-base gap-10">
                                <span>{generation}기</span>
                                {`${startDate.year}/${startDate.month}/${startDate.day}`} ~
                                {` ${endDate.month}/${endDate.day}`}
                            </span>
                            <button
                                className="bg-[#404040] text-white text-sm rounded-sm w-[111px] h-11"
                                onClick={() => setIsEditing(true)}
                            >
                                수정하기
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5 mt-8">
                            {/* 기수 선택 */}
                            <div className="w-[86px]">
                                <CustomSelect
                                    value={generation}
                                    onValueChange={setGeneration}
                                    placeholder={"기수별"}
                                    selectList={[
                                        { label: "12기", value: 12 },
                                        { label: "13기", value: 13 },
                                        { label: "14기", value: 14 }
                                    ]}
                                />
                            </div>

                            <div className="flex flex-row gap-2 items-center">
                                {/* 시작일 */}
                                <Select
                                    value={startDate.year}
                                    onValueChange={(v) =>
                                        setStartDate((prev) => ({ ...prev, year: v }))
                                    }
                                >
                                    <SelectTrigger
                                        isArrow={false}
                                        className="min-w-33 !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                                    >
                                        <SelectValue placeholder="년도" />
                                        <span className="ml-auto flex items-center">
                                            <TriggerClose className="icon-close size-2" />
                                            <TriggerOpen className="icon-open size-2" />
                                        </span>
                                    </SelectTrigger>

                                    <SelectContent className="w-33 min-w-33 rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                                        {years.map((y) => (
                                            <SelectItem
                                                key={y}
                                                value={y}
                                                className="w-33 min-w-[86px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                            >
                                                {y}년
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={startDate.month}
                                    onValueChange={(v) =>
                                        setStartDate((prev) => ({ ...prev, month: v }))
                                    }
                                >
                                    <SelectTrigger
                                        isArrow={false}
                                        className="min-w-22 !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                                    >
                                        <SelectValue placeholder="월" />
                                        <span className="ml-auto flex items-center">
                                            <TriggerClose className="icon-close size-2" />
                                            <TriggerOpen className="icon-open size-2" />
                                        </span>
                                    </SelectTrigger>

                                    <SelectContent className="w-22 min-w-22 rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                                        {months.map((m) => (
                                            <SelectItem
                                                key={m}
                                                value={m}
                                                className="w-22 min-w-22 h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                            >
                                                {m}월
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={startDate.day}
                                    onValueChange={(v) =>
                                        setStartDate((prev) => ({ ...prev, day: v }))
                                    }
                                >
                                    <SelectTrigger
                                        isArrow={false}
                                        className="min-w-22 !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                                    >
                                        <SelectValue placeholder="월" />
                                        <span className="ml-auto flex items-center">
                                            <TriggerClose className="icon-close size-2" />
                                            <TriggerOpen className="icon-open size-2" />
                                        </span>
                                    </SelectTrigger>

                                    <SelectContent className="w-22 min-w-22 rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                                        {startDays.map((d) => (
                                            <SelectItem
                                                key={d}
                                                value={d}
                                                className="w-22 min-w-22 h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                            >
                                                {d}일
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <span className="mx-2">-</span>
                                {/* 종료일 */}

                                <Select
                                    value={endDate.year}
                                    onValueChange={(v) =>
                                        setEndDate((prev) => ({ ...prev, year: v }))
                                    }
                                >
                                    <SelectTrigger
                                        isArrow={false}
                                        className="min-w-33 !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                                    >
                                        <SelectValue placeholder="년도" />
                                        <span className="ml-auto flex items-center">
                                            <TriggerClose className="icon-close size-2" />
                                            <TriggerOpen className="icon-open size-2" />
                                        </span>
                                    </SelectTrigger>

                                    <SelectContent className="w-33 min-w-33 rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                                        {years.map((y) => (
                                            <SelectItem
                                                key={y}
                                                value={y}
                                                className="w-33 min-w-[86px] h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                            >
                                                {y}년
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={endDate.month}
                                    onValueChange={(v) =>
                                        setEndDate((prev) => ({ ...prev, month: v }))
                                    }
                                >
                                    <SelectTrigger
                                        isArrow={false}
                                        className="min-w-22 !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                                    >
                                        <SelectValue placeholder="월" />
                                        <span className="ml-auto flex items-center">
                                            <TriggerClose className="icon-close size-2" />
                                            <TriggerOpen className="icon-open size-2" />
                                        </span>
                                    </SelectTrigger>

                                    <SelectContent className="w-22 min-w-22 rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                                        {months.map((m) => (
                                            <SelectItem
                                                key={m}
                                                value={m}
                                                className="w-22 min-w-22 h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                            >
                                                {m}월
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={endDate.day}
                                    onValueChange={(v) =>
                                        setEndDate((prev) => ({ ...prev, day: v }))
                                    }
                                >
                                    <SelectTrigger
                                        isArrow={false}
                                        className="min-w-22 !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                                    >
                                        <SelectValue placeholder="월" />
                                        <span className="ml-auto flex items-center">
                                            <TriggerClose className="icon-close size-2" />
                                            <TriggerOpen className="icon-open size-2" />
                                        </span>
                                    </SelectTrigger>

                                    <SelectContent className="w-22 min-w-22 rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                                        {endDays.map((d) => (
                                            <SelectItem
                                                key={d}
                                                value={d}
                                                className="w-22 min-w-22 h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                            >
                                                {d}일
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <button
                                    className="flex items-center justify-center text-white w-[111px] h-11 font-medium text-sm bg-[#404040] rounded-sm ml-3"
                                    onClick={handleSubmit}
                                >
                                    {recruitmentMutation.isPending ? <Spinner /> : "저장하기"}
                                </button>
                            </div>
                        </div>
                    )}
                    {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
                </>
            )}
        </div>
    );
};
