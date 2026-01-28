import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Member } from "@/types/members";
import { useState, useEffect } from "react";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteMember, updateMember } from "@/apis/admin/member";
import { CustomSelect } from "../common/custom-select";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CircleCheck, X } from "lucide-react";
import { toast, Toaster } from "sonner";

interface MemberInfoModalProps {
    open: boolean;
    onClose: () => void;
    member: Member | null;
}

export const MemberInfoModal = ({ open, onClose, member }: MemberInfoModalProps) => {
    const queryClient = useQueryClient();

    const [generation, setGeneration] = useState<string | number>("");
    const [part, setPart] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [authorization, setAuthorization] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

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
            setRole(member.role);
            setDepartment("");
        }
    }, [member]);

    // 회원정보 수정
    const mutation = useMutation({
        mutationFn: () =>
            updateMember(member!.id, {
                generation: Number(generation),
                username: member!.username,
                part,
                // role,
                role: "ROLE_ADMIN",
                department: role !== "ROLE_USER" ? department : null
                // 권한 여부 추가
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            toast(
                <div className="flex items-center gap-2">
                    <CircleCheck size={20} className="text-green-400" />
                    <span className="text-sm font-medium">회원정보가 저장되었습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
            onClose();
        },
        onError: () => {
            toast(
                <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-sm font-medium">회원 수정에 실패했습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteMember(member!.id, Number(generation)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            alert("회원 정보가 삭제되었습니다.");
            onClose();
            setDeleteConfirm(false);
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

    if (!member) return null;

    return (
        <>
            <Toaster position="top-center" offset={{ top: 120, left: 80 }} />
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    showCloseButton={false}
                    className="w-[395px] p-5 rounded-[8px] gap-0"
                >
                    <DialogHeader>
                        <DialogTitle className="h-5 text-base font-semibold">회원정보</DialogTitle>
                    </DialogHeader>
                    <button className="absolute top-5 right-5" onClick={onClose}>
                        <X size={20} />
                    </button>
                    <div className="flex flex-col gap-4 px-1">
                        <div className="flex flex-col gap-4 mt-10 mx-[1.5px]">
                            {/* 이름 */}
                            <div className="h-11 flex items-center gap-[35px]">
                                <span className="text-sm font-semibold text-[#666666]">이름</span>
                                <span className="flex flex-1 h-full px-4 items-center rounded-sm border border-[#C4C4C4] text-sm">
                                    {member.username}
                                </span>
                            </div>

                            {/* 기수 */}
                            <div className="h-11 flex items-center gap-[35px]">
                                <span className="text-sm font-semibold text-[#666666]">기수</span>
                                <div className="flex-1">
                                    <CustomSelect
                                        value={generation}
                                        onValueChange={setGeneration}
                                        placeholder={"기수별"}
                                        selectList={[
                                            { label: "12기", value: 12 },
                                            { label: "13기", value: 13 },
                                            { label: "14기", value: 14 }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* 파트 */}
                            <div className="h-11 flex items-center gap-[35px]">
                                <span className="text-sm font-semibold text-[#666666]">파트</span>
                                <div className="flex-1">
                                    <CustomSelect
                                        value={part}
                                        onValueChange={setPart}
                                        placeholder={"파트 선택"}
                                        selectList={[
                                            { label: "기획", value: "PLANNING" },
                                            { label: "디자인", value: "DESIGN" },
                                            { label: "AI", value: "AI" },
                                            { label: "프론트엔드", value: "FRONTEND" },
                                            { label: "백엔드", value: "BACKEND" }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* 역할 */}
                            <div className="h-11 flex items-center gap-[35px]">
                                <span className="text-sm font-semibold text-[#666666]">역할</span>
                                <RadioGroup
                                    value={role === "ROLE_ADMIN" ? "ROLE_MANAGER" : role}
                                    onValueChange={(val: "ROLE_USER" | "ROLE_MANAGER") => {
                                        if (role === "ROLE_ADMIN") return;
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
                                            value="ROLE_MANAGER"
                                            id="role-manager"
                                            className="text-[#ff7700] [&_svg]:fill-[#ff7700]"
                                        />
                                        <label htmlFor="role-manager" className="text-sm">
                                            운영진
                                        </label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* 부서 */}
                            <div className="h-11 flex items-center gap-[35px]">
                                <span className="text-sm font-semibold text-[#666666]">부서</span>
                                <div className="flex-1">
                                    <CustomSelect
                                        value={department}
                                        onValueChange={setDepartment}
                                        placeholder={"-"}
                                        selectList={[
                                            { label: "운영부", value: "OPERATION" },
                                            { label: "홍보부", value: "MARKETING" },
                                            { label: "학술부", value: "ACADEMIC" }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* 권한 */}
                            <div className="h-11 flex items-center gap-[35px]">
                                <span className="text-sm font-semibold text-[#666666]">권한</span>
                                <div>
                                    <Switch
                                        id="authorization"
                                        checked={authorization}
                                        onCheckedChange={setAuthorization}
                                        className="bg-gray-100 data-[state=checked]:bg-primary-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 버튼 */}
                        <div className="flex flex-row h-11 gap-2 font-medium mt-4">
                            <button
                                className="w-[170px] border border-[#FF7700] rounded-sm"
                                onClick={() => {
                                    onClose();
                                    setDeleteConfirm(true);
                                }}
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
            {/* 삭제 확인 모달 */}
            {deleteConfirm && (
                <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
                    <DialogContent className="flex flex-col justify-center w-[390px] p-7 rounded-[8px] gap-2 [&>button.absolute]:hidden">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-center">
                                계정 삭제
                            </DialogTitle>
                        </DialogHeader>
                        <div className="text-center text-sm font-medium">
                            모든 정보가 영구적으로 삭제되며, 다시 복구할 수 없습니다.
                        </div>
                        <div className="flex h-11 justify-end gap-2 mt-4">
                            <button
                                onClick={() => {
                                    deleteMutation.mutate();
                                }}
                                className="flex-1 h-full border border-[#ff7700]  text-black rounded-sm"
                            >
                                삭제하기
                            </button>
                            <button
                                onClick={() => setDeleteConfirm(false)}
                                className="flex-1 h-full bg-[#FF7700] text-white rounded-sm"
                            >
                                아니요
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};
