import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Member } from "@/types/member";
import { useState, useEffect } from "react";

interface MemberInfoModalProps {
    open: boolean;
    onClose: () => void;
    member: Member | null;
}

export const MemberInfoModal = ({ open, onClose, member }: MemberInfoModalProps) => {
    const [generation, setGeneration] = useState("");
    const [part, setPart] = useState("");
    const [role, setRole] = useState<"아기사자" | "운영진">("아기사자");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        if (member) {
            setGeneration(member.generation);
            setPart(member.part);
            setRole(member.role === "운영진" ? "운영진" : "아기사자");
            setDepartment("");
        }
    }, [member]);

    if (!member) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="w-[395px] p-5 rounded-[8px] gap-0"
            >
                <DialogHeader>
                    <DialogTitle className="h-5 text-base font-semibold">회원정보</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-10">
                    {/* 이름 */}
                    <div className="h-11 flex items-center gap-[35px]">
                        <span className="text-sm font-semibold text-[#666666]">이름</span>
                        <span className="flex h-full w-71 px-4 items-center rounded-sm border border-[#C4C4C4] text-sm">
                            {member.name}
                        </span>
                    </div>

                    {/* 기수 */}
                    <div className="h-11 flex items-center gap-[35px]">
                        <span className="text-sm font-semibold text-[#666666]">기수</span>
                        <Input
                            value={generation}
                            onChange={(e) => setGeneration(e.target.value)}
                            className="w-71 h-full rounded-sm border border-[#C4C4C4] text-sm focus-visible:ring-0"
                        />
                    </div>

                    {/* 파트 */}
                    <div className="h-11 flex items-center gap-[35px]">
                        <span className="text-sm font-semibold text-[#666666]">파트</span>
                        <Input
                            value={part}
                            onChange={(e) => setPart(e.target.value)}
                            className="w-71 h-full rounded-sm border border-[#C4C4C4] text-sm focus-visible:ring-0"
                        />
                    </div>

                    {/* 역할 */}
                    <div className="h-11 flex items-center gap-[35px]">
                        <span className="text-sm font-semibold text-[#666666]">역할</span>
                        <RadioGroup
                            value={role}
                            onValueChange={(val: "아기사자" | "운영진") => {
                                setRole(val);
                                if (val === "아기사자") setDepartment("");
                            }}
                            className="flex gap-6"
                        >
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem
                                    value="아기사자"
                                    id="role-baby"
                                    className="text-[#ff7700] [&_svg]:fill-[#ff7700]"
                                />
                                <label htmlFor="role-baby" className="text-sm">
                                    아기사자
                                </label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem
                                    value="운영진"
                                    id="role-admin"
                                    className="text-[#ff7700] [&_svg]:fill-[#ff7700]"
                                />
                                <label htmlFor="role-admin" className="text-sm">
                                    운영진
                                </label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* 부서 */}
                    <div className="h-11 flex items-center gap-[35px]">
                        <span className="text-sm font-semibold text-[#666666]">부서</span>
                        <Select
                            value={department}
                            onValueChange={setDepartment}
                            disabled={role === "아기사자"}
                        >
                            <SelectTrigger className="w-71 !h-full bg-white disabled:opacity-50 border border-[#c4c4c4]">
                                <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="운영부">운영부</SelectItem>
                                <SelectItem value="홍보부">홍보부</SelectItem>
                                <SelectItem value="학술부">학술부</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 버튼 */}
                    <div className="flex flex-row h-11 gap-2 font-medium mt-4">
                        <button className="w-[170px] border border-[#FF7700] rounded-sm">
                            삭제하기
                        </button>
                        <button className="w-[170px] bg-[#FF7700] text-white rounded-sm">
                            저장하기
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
