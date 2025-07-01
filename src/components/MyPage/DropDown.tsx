import { useState } from "react";

type DropDownProps = {
    label: string;
    options: string[];
    selected: string;
    setSelected: (value: string) => void;
};

export const DropDwon = ({ label, options, selected, setSelected }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`relative inline-block text-left border-1 border-[#C4C4C4] rounded rounded-[4px] ${label === "기수" ? `w-[86px]` : `w-[162px]`} h-[44px]`}
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`inline-flex justify-between w-full h-[44px] ${isOpen ? "rounded-t-[4px] border-b-[1px]" : "rounded-[4px] border-none "} px-4 py-2 bg-white text-[#2F3032] font-medium text-gray-700 flex items-center `}
            >
                <span>{selected || label} </span>
                <span>▾</span>
            </button>

            {isOpen && (
                <div className="absolute z-10 top-[44px] w-full  rounded-b-[4px] bg-white">
                    <div className="py-1 text-sm text-gray-700">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => {
                                    setSelected(option);
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {`${label === "기수" ? option + "기" : option}`}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
