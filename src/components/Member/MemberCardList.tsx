import type { MemberInfo } from "@/constants/mockMemberData";
import { MemberCard } from "./MemberCard";

interface MemberCardProps {
    MemberData: MemberInfo[];
}
export const MemberCardList = ({ MemberData }: MemberCardProps) => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-12 w-[1216px] pb-[120px]">
            {MemberData.map((member) => (
                <MemberCard key={member.id} {...member} />
            ))}
        </div>
    );
};
