import { useState, useEffect } from "react";

interface Member {
    id: string;
    name: string;
}

export const NewRetrospectionsInput = () => {
    const [retrospections, setRetrospections] = useState([{ memberId: "", url: "" }]);
    const [members, setMembers] = useState<Member[]>([]);
    const [searchText, setSearchText] = useState<string[]>([""]);
    const [showSuggestions, setShowSuggestions] = useState<boolean[]>([false]);

    useEffect(() => {
        const mockMembers: Member[] = [
            { id: "1", name: "김지원" },
            { id: "2", name: "이수현" },
            { id: "3", name: "박조아" },
            { id: "4", name: "정우성" }
        ];
        setMembers(mockMembers);
    }, []);

    const handleChange = (index: number, key: "memberId" | "url", value: string) => {
        const updated = [...retrospections];
        updated[index][key] = value;
        setRetrospections(updated);
    };

    const handleSearchChange = (index: number, value: string) => {
        const updated = [...searchText];
        updated[index] = value;
        setSearchText(updated);
        setShowSuggestions((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleSelectMember = (index: number, member: Member) => {
        handleChange(index, "memberId", member.id);
        handleSearchChange(index, member.name);
        setShowSuggestions((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const handleAdd = () => {
        setRetrospections([...retrospections, { memberId: "", url: "" }]);
        setSearchText([...searchText, ""]);
        setShowSuggestions([...showSuggestions, false]);
    };

    const handleRemove = (index: number) => {
        const updated = [...retrospections];
        const updatedSearch = [...searchText];
        const updatedSuggestions = [...showSuggestions];
        updated.splice(index, 1);
        updatedSearch.splice(index, 1);
        updatedSuggestions.splice(index, 1);
        setRetrospections(updated);
        setSearchText(updatedSearch);
        setShowSuggestions(updatedSuggestions);
    };

    return (
        <div className="flex flex-1 flex-col gap-3">
            {retrospections.map((item, index) => (
                <div key={index} className="gap-2 flex flex-1 relative">
                    <div className="relative w-[92px]">
                        <input
                            value={searchText[index] || ""}
                            onChange={(e) => handleSearchChange(index, e.target.value)}
                            placeholder="멤버 검색"
                            className="py-3 px-4 w-full bg-white text-[#47484B] font-normal border border-[#C4C4C4] rounded-[4px]"
                        />
                        {showSuggestions[index] && (
                            <ul className="absolute z-10 w-full bg-white  text-[#47484B] border border-[#C4C4C4] rounded-[4px] max-h-40 overflow-y-auto">
                                {members
                                    .filter((m) => m.name.includes(searchText[index]))
                                    .map((member) => (
                                        <li
                                            key={member.id}
                                            onClick={() => handleSelectMember(index, member)}
                                            className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer"
                                        >
                                            {member.name}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    <input
                        value={item.url}
                        onChange={(e) => handleChange(index, "url", e.target.value)}
                        placeholder="회고"
                        className="py-3 px-4 flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                    />

                    {retrospections.length > 1 && index === retrospections.length - 1 && (
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
