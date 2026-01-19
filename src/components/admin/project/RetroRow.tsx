import { useMemberSearch } from "@/stores/useMemberSearch";
import type { Member } from "@/types/members";
import type { Retro } from "@/types/project";

interface RetroRowProps {
    retro: Retro;
    index: number;
    onChange: (index: number, field: keyof Retro, value: any) => void;
    onSelect: (index: number, member: { id: number; name: string }) => void;
    onRemove?: () => void;
}

export const RetroRow = ({ retro, index, onChange, onSelect, onRemove }: RetroRowProps) => {
    const { data, isLoading } = useMemberSearch(retro.query);
    console.log(data);
    return (
        <div className="flex flex-row gap-2">
            {/* 멤버 검색 */}
            <div className="relative w-[89px]">
                <input
                    className="w-full h-11 px-4 border border-[#C4C4C4] text-sm rounded-sm"
                    placeholder="멤버 검색"
                    value={retro.query}
                    onChange={(e) => onChange(index, "query", e.target.value)}
                    onFocus={() => onChange(index, "showDropdown", true)}
                />

                {retro.showDropdown && (
                    <ul className="absolute z-10 w-full bg-white border rounded-sm shadow mt-1 max-h-40 overflow-auto">
                        {isLoading && (
                            <li className="px-4 py-2 text-sm text-gray-400">검색 중...</li>
                        )}

                        {data?.data.data.map((member: Member) => (
                            <li
                                key={member.id}
                                onClick={() => onSelect(index, member)}
                                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            >
                                {member.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 회고 입력 */}
            <div className="flex flex-1 relative">
                <input
                    maxLength={50}
                    className="w-full h-11 px-4 border border-[#C4C4C4] text-sm rounded-sm"
                    placeholder="회고"
                    value={retro.comment}
                    onChange={(e) => onChange(index, "comment", e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#999999]">
                    {retro.comment.replace(/\s/g, "").length}/50
                </span>
            </div>

            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="w-16 h-11 border text-sm border-gray-100 rounded-sm text-gray-400"
                >
                    삭제
                </button>
            )}
        </div>
    );
};
