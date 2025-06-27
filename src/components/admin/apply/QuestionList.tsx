import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Input } from "@/components/ui/input";
import { QuestionListHeader } from "./QuestionListHeader";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import GripHorizontal from "@/assets/admin/grip-horizontal.svg?react";
import AddQuestionBtn from "@/assets/admin/add-question-btn.svg?react";
interface Question {
    id: string;
    text: string;
    type: string;
}

interface QuestionListProps {
    title: string;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export default function QuestionList({ title, questions, setQuestions }: QuestionListProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
            type: "장문형"
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const handleDelete = (index: number) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
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
                                                        <div className="w-full flex flex-row gap-[9px]">
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
                                                            <div className="w-full">
                                                                <input className="w-full h-11 border border-[#C4C4C4] rounded px-3 py-2 text-sm text-gray-500" />
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
