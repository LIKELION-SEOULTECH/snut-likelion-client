import { useState } from "react";

interface StackInputColor {
    color: "white-gray" | "dark-gray";
}

export const StackInput = ({ color }: StackInputColor) => {
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === "," || e.key === " ") && inputValue.trim()) {
            e.preventDefault();
            const input = inputValue.trim();

            const newTags = input
                .split(/[, ]+/)
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0 && !tags.includes(tag));

            if (newTags.length > 0) {
                setTags([...tags, ...newTags]);
            }
            setInputValue("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-1 min-h-[44px] flex-wrap py-[6px] px-2  flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]  gap-y-2 ">
            {tags.map((tag) => (
                <div
                    key={tag}
                    className={`flex items-center rounded-[4px] px-3 py-1 text-semibold mr-2 ${color == "dark-gray" ? "bg-[#404040] text-white" : "bg-[#ECECEC] text-black"}`}
                >
                    {tag}
                    <button className="ml-2 " onClick={() => removeTag(tag)}>
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
