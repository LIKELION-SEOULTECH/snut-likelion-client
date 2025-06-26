import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import GripHorizontal from "@/assets/admin/grip-horizontal.svg?react";
interface Question {
    id: string;
    text: string;
    type: string;
}

export default function DraggableQuestionList() {
    const [questions, setQuestions] = useState<Question[]>([
        { id: "1", text: "이름", type: "단답형" },
        { id: "2", text: "학과", type: "단답형" },
        { id: "3", text: "학번", type: "단답형" },
        { id: "4", text: "휴대폰 번호", type: "단답형" },
        { id: "5", text: "학년 (올해 기준)", type: "단답형" },
        { id: "6", text: "학적 상태", type: "단답형" }
    ]);

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
        <div className="bg-white p-6 rounded-sm w-full">
            <div className="text-xl font-semibold mb-10">기본</div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questionList">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-3"
                        >
                            {questions.map((q, index) => (
                                <Draggable key={q.id} draggableId={q.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="w-full flex flex-col bg-white p-3 rounded-md items-center gap-2"
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                className="flex flex-row w-full justify-between cursor-grab text-gray-400"
                                            >
                                                <GripHorizontal />
                                                {questions.length > 1 && (
                                                    <button
                                                        className="text-sm text-gray-400 ml-2 hover:underline"
                                                        onClick={() => handleDelete(index)}
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
                                                        updated[index].text = e.target.value;
                                                        setQuestions(updated);
                                                    }}
                                                    className="flex-1 rounded-sm"
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
                                                    <SelectTrigger className="w-53 rounded-sm">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-sm">
                                                        <SelectItem value="장문형">
                                                            장문형
                                                        </SelectItem>
                                                        <SelectItem value="단답형">
                                                            단답형
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleAdd}
                    className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-600"
                >
                    +
                </button>
            </div>
        </div>
    );
}
