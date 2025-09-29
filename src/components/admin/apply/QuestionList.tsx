import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Input } from "@/components/ui/input";
import { QuestionListHeader } from "./QuestionListHeader";
import { Plus } from "lucide-react";
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

        // order 재정렬(선택)
        const withOrder = items.map((q, idx) => ({ ...q, order: idx }));
        setQuestions(withOrder);

        console.log(
            "Updated order:",
            withOrder.map((item) => item.text)
        );
    };

    const handleAdd = () => {
        const nextOrder = questions.length;
        const newQuestion: Question = {
            id: Date.now(), // 로컬 임시 id(숫자). 서버 저장 시 새 id로 대체 가능
            text: "",
            questionType: "단답형", // 기본값
            questionTarget,
            part: questionTarget === "PART" ? (part ?? "") : "",
            departmentType: questionTarget === "DEPARTMENT" ? (departmentType ?? "") : "",
            order: nextOrder
            // 라디오가 아닐 땐 options 생략
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
        const opts = target.options ? [...target.options] : [];
        opts.push("");
        updated[index] = { ...target, options: opts };
        setQuestions(updated);
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const updated = [...questions];
        const target = updated[qIndex];
        if (!target.options) return;
        const opts = [...target.options];
        opts[oIndex] = value;
        updated[qIndex] = { ...target, options: opts };
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
                                            key={String(q.id)}
                                            draggableId={String(q.id)}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div key={String(q.id)} className="w-full">
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
                                                                        val === "라디오 버튼"
                                                                            ? {
                                                                                  ...q,
                                                                                  questionType: val,
                                                                                  options:
                                                                                      q.options ?? [
                                                                                          ""
                                                                                      ]
                                                                              }
                                                                            : {
                                                                                  ...q,
                                                                                  questionType: val,
                                                                                  options: undefined
                                                                              };
                                                                    updated[index] = next;
                                                                    setQuestions(updated);
                                                                }}
                                                            >
                                                                <SelectTrigger className="w-53 !h-11 px-4 py-3 rounded-sm border border-[#C4C4C4]">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent className="rounded-sm">
                                                                    <SelectItem
                                                                        value="장문형"
                                                                        className="h-11"
                                                                    >
                                                                        장문형
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value="단답형"
                                                                        className="h-11"
                                                                    >
                                                                        단답형
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        value="라디오 버튼"
                                                                        className="h-11"
                                                                    >
                                                                        라디오 버튼
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {/* 라디오 버튼 옵션 */}
                                                        {q.questionType === "라디오 버튼" && (
                                                            <div className="w-full flex flex-col gap-2">
                                                                {q.options?.map((opt, optIndex) => (
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
                                                                ))}
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
