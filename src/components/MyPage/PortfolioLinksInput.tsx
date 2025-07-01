import { useState } from "react";

export const PortfolioLinksInput = () => {
    const [links, setLinks] = useState([{ type: "", url: "" }]);

    const handleChange = (index: number, key: "type" | "url", value: string) => {
        const updated = [...links];
        updated[index][key] = value;
        setLinks(updated);
    };

    const handleAdd = () => {
        setLinks([...links, { type: "", url: "" }]);
    };

    const handleRemove = (index: number) => {
        const updated = [...links];
        updated.splice(index, 1);
        setLinks(updated);
    };

    return (
        <div className="flex flex-1 flex-col gap-3">
            {links.map((link, index) => (
                <div key={index} className="gap-2 flex flex-1">
                    <select
                        value={link.type}
                        onChange={(e) => handleChange(index, "type", e.target.value)}
                        className="py-3 px-4 w-[118px] bg-white text-[#47484B] font-normal border border-[#C4C4C4] rounded-[4px] "
                    >
                        <option value="">링크 이름</option>
                        <option>Blog</option>
                        <option>Github</option>
                        <option>Behance</option>
                        <option>Instagram</option>
                        <option>Notion</option>
                        <option>Other</option>
                    </select>

                    <input
                        value={link.url}
                        onChange={(e) => handleChange(index, "url", e.target.value)}
                        placeholder="https://"
                        className="py-3 px-4 flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                    />

                    {links.length > 1 && index === links.length - 1 && (
                        <button
                            onClick={() => handleRemove(index)}
                            className="w-[64px] text-[14px] border border-[#C4C4C4] rounded-[4px] text-[#666] bg-[#FFF]"
                        >
                            삭제
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={handleAdd}
                className="w-[73px] h-[39px] border text-[#F70] text-[14px] border-[#F70] mt-4 rounded"
            >
                + 추가
            </button>
        </div>
    );
};
