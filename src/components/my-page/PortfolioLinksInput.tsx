import { CustomSelect } from "../admin/common/custom-select";

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
                <div key={index} className="h-11 gap-2 flex flex-1">
                    <div className="w-[118px]">
                        <CustomSelect
                            value={link.name}
                            onValueChange={(value) => {
                                if (typeof value === "function") return;
                                handleChange(index, "name", value);
                            }}
                            placeholder={"링크 이름"}
                            selectList={[
                                { label: "Blog", value: "BLOG" },
                                { label: "Github", value: "GITHUB" },
                                { label: "Behance", value: "BEHANCE" },
                                { label: "Instagram", value: "INSTAGRAM" },
                                { label: "Notion", value: "NOTION" },
                                { label: "Other", value: "OTHER" }
                            ]}
                        />
                    </div>

                    <input
                        value={link.url}
                        onChange={(e) => handleChange(index, "url", e.target.value)}
                        placeholder="https://"
                        className="h-full py-3 px-4 flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                    />
                    {value.length > 1 && index === value.length - 1 && (
                        <button
                            onClick={() => handleRemove(index)}
                            className="w-[64px] h-full text-[14px] border border-[#C4C4C4] rounded-[4px] text-[#666] bg-[#FFF]"
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
