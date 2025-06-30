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
import { updateMember, deleteMember } from "@/apis/member";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface MemberInfoModalProps {
    open: boolean;
    onClose: () => void;
    member: Member | null;
}

export const MemberInfoModal = ({ open, onClose, member }: MemberInfoModalProps) => {
    const queryClient = useQueryClient();

    const [generation, setGeneration] = useState("");
    const [part, setPart] = useState("");
    const [role, setRole] = useState<"ROLE_USER" | "ROLE_ADMIN">("ROLE_USER");
    const [department, setDepartment] = useState("");

    const partToEnumValue = (part: string): string => {
        switch (part) {
            case "프론트엔드":
                return "FRONTEND";
            case "백엔드":
                return "BACKEND";
            case "디자인":
                return "DESIGN";
            case "기획":
                return "PLANNING";
            case "AI":
                return "AI";
            default:
                return "";
        }
    };

    useEffect(() => {
        if (member) {
            setGeneration(member.generation);
            setPart(partToEnumValue(member.part));
            setRole(member.role === "ROLE_ADMIN" ? "ROLE_ADMIN" : "ROLE_USER");
            setDepartment("");
        }
    }, [member]);

    const mutation = useMutation({
        mutationFn: () =>
            updateMember(member!.id, {
                generation: Number(generation),
                username: member!.username, // username 안 써도 되는 경우엔 제거 가능
                part,
                role,
                department: role === "ROLE_ADMIN" ? department : null
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            console.log("회원 정보가 성공적으로 수정되었습니다.");
            onClose();
        },
        onError: (error) => {
            console.error("회원 정보 수정 실패:", error);
            alert("회원 정보 수정에 실패했습니다.");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteMember(member!.id, Number(generation)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            alert("회원 정보가 삭제되었습니다.");
            onClose();
        },
        onError: (error) => {
            console.error("회원 삭제 실패:", error);
            alert("회원 삭제에 실패했습니다.");
        }
    });

    const handleUpdate = () => {
        if (!member) return;
        mutation.mutate();
    };

    const handleDelete = () => {
        deleteMutation.mutate();
    };

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
                            {member.username}
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
                        <Select value={part} onValueChange={setPart}>
                            <SelectTrigger className="w-71 !h-full bg-white border border-[#c4c4c4]">
                                <SelectValue placeholder="파트 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="FRONTEND">프론트엔드</SelectItem>
                                <SelectItem value="BACKEND">백엔드</SelectItem>
                                <SelectItem value="DESIGN">디자인</SelectItem>
                                <SelectItem value="PLANNING">기획</SelectItem>
                                <SelectItem value="AI">AI</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 역할 */}
                    <div className="h-11 flex items-center gap-[35px]">
                        <span className="text-sm font-semibold text-[#666666]">역할</span>
                        <RadioGroup
                            value={role}
                            onValueChange={(val: "ROLE_USER" | "ROLE_ADMIN") => {
                                setRole(val);
                                if (val === "ROLE_USER") setDepartment("");
                            }}
                            className="flex gap-6"
                        >
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem
                                    value="ROLE_USER"
                                    id="role-user"
                                    className="text-[#ff7700] [&_svg]:fill-[#ff7700]"
                                />
                                <label htmlFor="role-baby" className="text-sm">
                                    아기사자
                                </label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem
                                    value="ROLE_ADMIN"
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
                            disabled={role === "ROLE_USER"}
                        >
                            <SelectTrigger className="w-71 !h-full bg-white disabled:opacity-50 border border-[#c4c4c4]">
                                <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="OPERATION">운영부</SelectItem>
                                <SelectItem value="MARKETING">홍보부</SelectItem>
                                <SelectItem value="ACADEMIC">학술부</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 버튼 */}
                    <div className="flex flex-row h-11 gap-2 font-medium mt-4">
                        <button
                            className="w-[170px] border border-[#FF7700] rounded-sm"
                            onClick={handleDelete}
                        >
                            삭제하기
                        </button>
                        <button
                            className="w-[170px] bg-[#FF7700] text-white rounded-sm"
                            onClick={handleUpdate}
                        >
                            저장하기
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
