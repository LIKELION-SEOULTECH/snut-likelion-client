import { MemberCard } from "./MemberCard";
import { Link } from "react-router-dom";
import type { MemberResponse } from "@/types/members";

interface MemberCardProps {
    MemberData: MemberResponse[];
}
export const MemberCardList = ({ MemberData }: MemberCardProps) => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-12 w-[1216px] pb-[120px]">
            {MemberData.map((member) => (
                <Link to={`/members/${member.id}`}>
                    <MemberCard key={member.id} {...member} />
                </Link>
            ))}
        </div>
    );
};
