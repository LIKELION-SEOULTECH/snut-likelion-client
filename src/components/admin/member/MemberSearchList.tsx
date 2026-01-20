import { useState } from "react";
import type { Member } from "@/types/members";
import { MemberInfoModal } from "./MemberInfoModal";
interface MemberSearchListProps {
    members: Member[];
    currentPage: number;
    itemsPerPage: number;
}
export const MemberSearchList = ({ members, currentPage, itemsPerPage }: MemberSearchListProps) => {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

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
                    {members?.map((member, index) => (
                        <div
                            key={member.id}
                            onClick={() => handleClick(member)}
                            className={`flex h-[66px] items-center font-medium cursor-pointer ${index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"}`}
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
                member={selectedMember}
            />
        </div>
    );
};
