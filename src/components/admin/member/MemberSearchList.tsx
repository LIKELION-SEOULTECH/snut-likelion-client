import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Member } from "@/types/members";
import { MemberInfoModal } from "./MemberInfoModal";
interface MemberSearchListProps {
    data: Member[];
    currentPage: number;
    itemsPerPage: number;
}
export const MemberSearchList = ({ data, currentPage, itemsPerPage }: MemberSearchListProps) => {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleClick = (member: Member) => {
        setSelectedMember(member);
        setModalOpen(true);
    };

    return (
        <div>
            <div className="w-full rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div className="h-10 flex text-medium-14 items-center text-[#666666] font-medium bg-[#FAFAFA]">
                    <span className="flex-[1] text-left pl-[30px]">No</span>
                    <span className="flex-[4] text-left">이름</span>
                    <span className="flex-[1.5] text-left">기수</span>
                    <span className="flex-[1.5] text-left">파트</span>
                    <span className="flex-[1.5] text-left">역할</span>
                </div>
                {/* 리스트 content */}
                <div>
                    {data?.map((member, index) => (
                        <div
                            key={member.id}
                            onClick={() => handleClick(member)}
                            className={`flex h-[66px] items-center font-medium ${index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"}`}
                        >
                            <span className="flex-[1] pl-[30px] text-left">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </span>
                            <span className="flex-[4] text-left">{member.username}</span>
                            <span className="flex-[1.5] text-left">{member.generation}기</span>
                            <span className="flex-[1.5] text-left">{member.part}</span>
                            <span className="flex-[1.5] text-left">{member.role}</span>
                        </div>
                    ))}
                </div>
            </div>
            <MemberInfoModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onDeleteClick={() => {
                    setModalOpen(false);
                    setShowDeleteConfirm(true);
                }}
                member={selectedMember}
            />
            {/* 삭제 확인 모달 */}
            {showDeleteConfirm && (
                <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
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
                                    // 실제 삭제 로직 추가
                                    setShowDeleteConfirm(false);
                                }}
                                className="flex-1 h-full border border-[#ff7700]  text-black rounded-sm"
                            >
                                삭제하기
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 h-full bg-[#FF7700] text-white rounded-sm"
                            >
                                아니요
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
