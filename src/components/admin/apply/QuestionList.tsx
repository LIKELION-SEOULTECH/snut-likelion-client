import { useState, useEffect } from "react";
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
import { updateQuestions } from "@/apis/admin/recruitment";

interface Question {
    id: string;
    text: string;
    type: string;
    options?: string[];
}

interface QuestionListProps {
    title: string;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    recId: number;
    part?: string;
    questionTarget: string;
    departmentType?: string;
    onSave?: (fn: () => void) => void;
}

export default function QuestionList({
    title,
    questions,
    setQuestions,
    recId,
    part,
    questionTarget,
    onSave,
    departmentType
}: QuestionListProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (onSave) {
            onSave(handleSave); // 상위 컴포넌트에서 이 save 함수를 등록함
        }
    }, [questions]);

    const handleToggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setQuestions(items);
        console.log(
            "Updated order:",
            items.map((item) => item.text)
        );
    };

    const handleAdd = () => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            text: "",
            type: "단답형"
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const handleDelete = (index: number) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddOption = (index: number) => {
        const updated = [...questions];
        const target = updated[index];

        if (!target.options) {
            target.options = [""];
        } else {
            target.options.push("");
        }

        setQuestions(updated);
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const updated = [...questions];
        if (updated[qIndex].options) {
            updated[qIndex].options![oIndex] = value;
            setQuestions(updated);
        }
    };

    const handleSave = async () => {
        const payload = questions.map((q, index) => ({
            text: q.text,
            questionType:
                q.type === "단답형" ? "SHORT" : q.type === "장문형" ? "LONG" : "RADIO_BUTTON",
            questionTarget,
            order: index + 1,
            part: questionTarget === "PART" ? part : undefined,
            departmentType: questionTarget === "DEPARTMENT" ? departmentType : undefined,
            buttonList: q.type === "라디오 버튼" ? (q.options ?? []) : undefined
        }));

        try {
            await updateQuestions(recId, payload);
            alert("질문 저장 완료!");
        } catch (error) {
            console.error("질문 저장 실패:", error);
            alert("질문 저장 실패");
        }
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
                                        <Draggable key={q.id} draggableId={q.id} index={index}>
                                            {(provided) => (
                                                <div key={q.id} className="w-full">
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
                                                                    className="text-sm text-[#A7A7A7]  hover:underline"
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
                                                                    updated[index].text =
                                                                        e.target.value;
                                                                    setQuestions(updated);
                                                                }}
                                                                className="h-11 px-4 py-3 flex-1 rounded-sm border border-[#C4C4C4]"
                                                                placeholder="질문을 입력하세요"
                                                            />
                                                            <Select
                                                                value={q.type}
                                                                onValueChange={(val) => {
                                                                    const updated = [...questions];
                                                                    updated[index].type = val;
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
                                                        {/* 라디오 버튼 예시 */}
                                                        {q.type === "라디오 버튼" && (
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
                                                                        className="w-full h-11 border border-[#C4C4C4] rounded px-3 py-2 text-sm text-gray-500"
                                                                        placeholder={`옵션 ${optIndex + 1}`}
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
