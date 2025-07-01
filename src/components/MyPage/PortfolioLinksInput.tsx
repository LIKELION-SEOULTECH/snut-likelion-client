interface PortfolioLinksInputProps {
    value: { name: string; url: string }[];
    onChange: (newLinks: { name: string; url: string }[]) => void;
}

export const PortfolioLinksInput = ({ value, onChange }: PortfolioLinksInputProps) => {
    const links = value.length > 0 ? value : [{ name: "", url: "" }];
    const handleChange = (index: number, key: "name" | "url", newValue: string) => {
        const updated = [...links];
        updated[index][key] = newValue;
        onChange(updated);
    };

    const handleAdd = () => {
        onChange([...value, { name: "", url: "" }]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <div className="flex flex-1 flex-col gap-3">
            {value.map((link, index) => (
                <div key={index} className="gap-2 flex flex-1">
                    <select
                        value={link.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        className="py-3 px-4 w-[118px] bg-white text-[#47484B] font-normal border border-[#C4C4C4] rounded-[4px]"
                    >
                        <option value="">링크 이름</option>
                        <option value="BLOG">Blog</option>
                        <option value="GITHUB">Github</option>
                        <option value="BEHANCE">Behance</option>
                        <option value="INSTAGRAM">Instagram</option>
                        <option value="NOTION">Notion</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <input
                        value={link.url}
                        onChange={(e) => handleChange(index, "url", e.target.value)}
                        placeholder="https://"
                        className="py-3 px-4 flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                    />
                    {value.length > 1 && index === value.length - 1 && (
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
