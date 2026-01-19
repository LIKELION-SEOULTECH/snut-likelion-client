import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Input } from "@/components/ui/input";
import { QuestionListHeader } from "./QuestionListHeader";
import { Minus, Plus } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import GripHorizontal from "@/assets/admin/grip-horizontal.svg?react";
import AddQuestionBtn from "@/assets/admin/add-question-btn.svg?react";
import type { Question } from "@/types/apply";
import TriggerClose from "@/assets/admin/trigger-close.svg?react";
import TriggerOpen from "@/assets/admin/trigger-open.svg?react";

interface QuestionListProps {
    title: string;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    part?: string;
    questionTarget: string;
    departmentType?: string;
}

export default function QuestionList({
    title,
    questions,
    setQuestions,
    questionTarget,
    part,
    departmentType
}: QuestionListProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggleCollapse = () => setIsCollapsed((prev) => !prev);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const withOrder = items.map((q, idx) => ({ ...q, order: idx }));
        setQuestions(withOrder);
    };

    const handleAdd = () => {
        const nextOrder = questions.length;
        const newQuestion: Question = {
            text: "",
            questionType: "SHORT",
            questionTarget,
            part: questionTarget === "PART" ? (part ?? "") : "",
            departmentType: questionTarget === "DEPARTMENT" ? (departmentType ?? "") : "",
            order: nextOrder
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const handleDelete = (index: number) => {
        const next = questions
            .filter((_, i) => i !== index)
            .map((q, idx) => ({ ...q, order: idx }));
        setQuestions(next);
    };

    const handleAddOption = (index: number) => {
        const updated = [...questions];
        const target = updated[index];
        const opts = target.buttonList ? [...target.buttonList] : [];
        opts.push("");
        updated[index] = { ...target, buttonList: opts };
        setQuestions(updated);
    };

    const handleDeleteOption = (index: number) => {
        setQuestions((prev) => {
            const updated = [...prev];
            const target = updated[index];

            if (!target.buttonList || target.buttonList.length <= 1) {
                return prev;
            }

            const opts = [...target.buttonList];
            opts.pop();

            updated[index] = { ...target, buttonList: opts };
            return updated;
        });
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const updated = [...questions];
        const target = updated[qIndex];
        if (!target.buttonList) return;
        const opts = [...target.buttonList];
        opts[oIndex] = value;
        updated[qIndex] = { ...target, buttonList: opts };
        setQuestions(updated);
    };

    return (
        <div className="bg-white p-10 rounded-sm w-full mb-10">
            <QuestionListHeader
                title={title}
                firstQuestionText={questions[0]?.text || "질문 없음"}
                isCollapsed={isCollapsed}
                onToggle={handleToggleCollapse}
            />
            {!isCollapsed && (
                <>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="questionList">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {questions.map((q, index) => (
                                        <Draggable
                                            key={String(q.clientId)}
                                            draggableId={String(q.clientId)}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div key={String(q.clientId)} className="w-full">
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className="w-full flex flex-col bg-white rounded-md items-center gap-2"
                                                    >
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="flex flex-row w-full justify-between cursor-grab text-gray-400"
                                                        >
                                                            <GripHorizontal />
                                                            {questions.length > 1 && (
                                                                <button
                                                                    className="text-sm text-[#A7A7A7] hover:underline"
                                                                    onClick={() =>
                                                                        handleDelete(index)
                                                                    }
                                                                >
                                                                    삭제하기
                                                                </button>
                                                            )}
                                                        </div>

                                                        <div className="w-full flex flex-row gap-2">
                                                            <Input
                                                                value={q.text}
                                                                onChange={(e) => {
                                                                    const updated = [...questions];
                                                                    updated[index] = {
                                                                        ...q,
                                                                        text: e.target.value
                                                                    };
                                                                    setQuestions(updated);
                                                                }}
                                                                className="h-11 px-4 py-3 flex-1 rounded-sm border border-[#C4C4C4]"
                                                                placeholder="질문을 입력하세요"
                                                            />

                                                            <Select
                                                                value={q.questionType}
                                                                onValueChange={(val) => {
                                                                    const updated = [...questions];
                                                                    // 라디오로 변경되면 options 보장
                                                                    const next =
                                                                        val === "RADIO_BUTTON"
                                                                            ? {
                                                                                  ...q,
                                                                                  questionType: val,
                                                                                  buttonList:
                                                                                      q.buttonList ?? [
                                                                                          ""
                                                                                      ]
                                                                              }
                                                                            : {
                                                                                  ...q,
                                                                                  questionType: val,
                                                                                  buttonList:
                                                                                      undefined
                                                                              };
                                                                    updated[index] = next;
                                                                    setQuestions(updated);
                                                                }}
                                                            >
                                                                <SelectTrigger
                                                                    isArrow={false}
                                                                    className="min-w-53 !h-11 pl-4 bg-white border-gray-100 rounded-sm data-[placeholder]:text-gray-200 [&_.icon-open]:hidden data-[state=open]:[&_.icon-open]:block data-[state=open]:[&_.icon-close]:hidden data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                                                                >
                                                                    <SelectValue placeholder="질문 유형" />
                                                                    <span className="ml-auto flex items-center">
                                                                        <TriggerClose className="icon-close size-2" />
                                                                        <TriggerOpen className="icon-open size-2" />
                                                                    </span>
                                                                </SelectTrigger>

                                                                <SelectContent className="w-53 min-w-53 rounded-sm border-gray-100 data-[side=bottom]:translate-y-0 data-[state=open]:rounded-t-none data-[state=open]:border-t-0 py-2">
                                                                    <SelectItem
                                                                        value="SHORT"
                                                                        className="w-53 min-w-53 h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                                                    >
                                                                        단답형
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value="LONG"
                                                                        className="w-53 min-w-53 h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                                                    >
                                                                        장문형
                                                                    </SelectItem>

                                                                    <SelectItem
                                                                        value="RADIO_BUTTON"
                                                                        className="w-53 min-w-53 h-9 px-4 data-[state=checked]:font-semibold cursor-pointer"
                                                                    >
                                                                        라디오 버튼
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {/* 라디오 버튼 옵션 */}
                                                        {q.questionType === "RADIO_BUTTON" && (
                                                            <div className="w-full flex flex-col gap-2">
                                                                {q.buttonList?.map(
                                                                    (opt, optIndex) => (
                                                                        <input
                                                                            key={optIndex}
                                                                            value={opt}
                                                                            onChange={(e) =>
                                                                                handleOptionChange(
                                                                                    index,
                                                                                    optIndex,
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            className="w-full h-11 border border-[#C4C4C4] rounded px-4 py-3 text-sm text-[#2D2D2D]"
                                                                            placeholder={`예시 답변`}
                                                                        />
                                                                    )
                                                                )}
                                                                <div className="flex flex-row gap-2">
                                                                    <button
                                                                        type="button"
                                                                        className="w-[73px] h-[39px] flex flex-row items-center justify-center rounded-sm font-medium text-[#ff7700] border border-[#ff7700] gap-1 mt-2"
                                                                        onClick={() =>
                                                                            handleAddOption(index)
                                                                        }
                                                                    >
                                                                        <Plus size={20} />
                                                                        추가
                                                                    </button>
                                                                    {q.buttonList &&
                                                                        q.buttonList.length > 1 && (
                                                                            <button
                                                                                type="button"
                                                                                className="w-[73px] h-[39px] flex flex-row items-center justify-center rounded-sm font-medium text-[#c4c4c4] border border-[#c4c4c4] gap-1 mt-2"
                                                                                onClick={() =>
                                                                                    handleDeleteOption(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Minus size={20} />
                                                                                삭제
                                                                            </button>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {index < questions.length - 1 && (
                                                        <div className="my-8 border-b border-[#F5F5F5] w-full" />
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <div className="mt-8 flex justify-center">
                        <button onClick={handleAdd} className="flex items-center justify-center">
                            <AddQuestionBtn />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
