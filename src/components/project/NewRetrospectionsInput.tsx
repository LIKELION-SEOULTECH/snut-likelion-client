import { fetchMemberList } from "@/apis/members";
import type { MemberSearch } from "@/types/member";
import { useState, useEffect } from "react";

interface Member {
    id: string;
    name: string;
    profileImageUrl?: string;
}

interface Retrospection {
    memberId: number;
    content: string;
}

interface Props {
    value: Retrospection[];
    onChange: (retros: Retrospection[]) => void;
}

export const NewRetrospectionsInput = ({ value, onChange }: Props) => {
    const [members, setMembers] = useState<MemberSearch[]>([]);

    const [searchText, setSearchText] = useState<string[]>(value.map(() => ""));
    const [showSuggestions, setShowSuggestions] = useState<boolean[]>(value.map(() => false));

    // 불러오기...
    useEffect(() => {
        const loadMembers = async () => {
            const memberList = await fetchMemberList({ keyword: "" });
            setMembers(memberList.data.data);
        };
        loadMembers();
    }, []);

    const handleChange = (index: number, key: "memberId" | "content", fieldValue: string) => {
        const updated: Retrospection[] = [...value];
        updated[index] = {
            ...updated[index],
            [key]: key === "memberId" ? Number(fieldValue) : fieldValue
        };
        onChange(updated);
    };

    const handleSearchChange = async (index: number, value: string) => {
        const updated = [...searchText];
        updated[index] = value;
        setSearchText(updated);

        const memberList = await fetchMemberList({ keyword: value });
        setMembers(memberList.data.data);

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
        onChange([...value, { memberId: 0, content: "" }]);
        setSearchText([...searchText, ""]);
        setShowSuggestions([...showSuggestions, false]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);

        const updatedSearch = [...searchText];
        updatedSearch.splice(index, 1);
        setSearchText(updatedSearch);

        const updatedSuggestions = [...showSuggestions];
        updatedSuggestions.splice(index, 1);
        setShowSuggestions(updatedSuggestions);
    };

    return (
        <div className="flex flex-1 flex-col gap-3">
            {value.map((item, index) => (
                <div key={index} className="gap-2 flex flex-1 relative">
                    <div className="relative w-[92px]">
                        <input
                            value={searchText[index] || ""}
                            onChange={(e) => handleSearchChange(index, e.target.value)}
                            placeholder="멤버 검색"
                            onFocus={() => {
                                setShowSuggestions((prev) => {
                                    const copy = [...prev];
                                    copy[index] = true;
                                    return copy;
                                });
                            }}
                            className="py-3 px-4 w-full bg-white text-[#47484B] font-normal border border-[#C4C4C4] rounded-[4px]"
                        />
                        {showSuggestions[index] && (
                            <ul className="absolute z-10 w-full bg-white text-[#47484B] border border-[#C4C4C4] rounded-[4px] max-h-40 overflow-y-auto">
                                {Array.isArray(members) &&
                                    members
                                        .filter((m) => m.name.startsWith(searchText[index]))
                                        .map((member) => (
                                            <li
                                                key={member.id}
                                                onClick={() =>
                                                    handleSelectMember(index, {
                                                        id: String(member.id),
                                                        name: member.name,
                                                        profileImageUrl: member.profileImageUrl
                                                    })
                                                }
                                                className="px-4 py-2 hover:bg-[#f0f0f0] flex justify-center items-center cursor-pointer"
                                            >
                                                <img
                                                    className="w-6 h-6 mr-2 rounded-full"
                                                    src={member.profileImageUrl}
                                                    alt={member.name}
                                                />
                                                <span>{member.name}</span>
                                            </li>
                                        ))}
                            </ul>
                        )}
                    </div>

                    <input
                        value={item.content}
                        onChange={(e) => handleChange(index, "content", e.target.value)}
                        placeholder="회고"
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
