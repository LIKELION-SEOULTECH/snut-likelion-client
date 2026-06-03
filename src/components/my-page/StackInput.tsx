import { useEffect, useState } from "react";

interface StackInputColor {
    value: string[];
    onChange: (newStacks: string[]) => void;
    color: "white-gray" | "dark-gray";
}

export const StackInput = ({ value, onChange, color }: StackInputColor) => {
    const [inputValue, setInputValue] = useState("");
    const [stacks, setStacks] = useState<string[]>([]);

    //기존거
    useEffect(() => {
        if (value.length > 0) {
            setStacks(value);
        }
    }, [value]);

    // 바뀐거 ?
    useEffect(() => {
        onChange(stacks);
    }, [stacks, onChange]);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === "," || e.key === " ") && inputValue.trim()) {
            e.preventDefault();
            const input = inputValue.trim();

            const newStacks = input
                .split(/[, ]+/)
                .map((stack) => stack.trim())
                .filter((stack) => stack.length > 0 && !stacks.includes(stack));

            if (newStacks.length > 0) {
                setStacks([...stacks, ...newStacks]);
            }
            setInputValue("");
        }
    };

    const removeStack = (tagToRemove: string) => {
        setStacks(stacks.filter((stack) => stack !== tagToRemove));
    };

    return (
        <div className="flex  min-h-[44px] flex-wrap py-[6px] px-2  flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]  gap-y-2 ">
            {stacks.map((stack) => (
                <div
                    key={stack}
                    className={`flex items-center rounded-[4px] px-3 py-1 text-semibold mr-2 ${color == "dark-gray" ? "bg-[#404040] text-white" : "bg-[#ECECEC] text-black"}`}
                >
                    {stack}
                    <button className="ml-2 " onClick={() => removeStack(stack)}>
                        ×
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleKeyUp}
                className="flex-1 outline-none text-black text-semibold min-w-[100px]  px-2"
                placeholder="기술스택"
            />
        </div>
    );
};
