import { MemberCard } from "./MemberCard";
import { mockMemberData } from "../../constants/mockMemberData";

export const MemberCardList = () => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-12 w-[1216px] pb-[120px]">
            {mockMemberData.map((member) => (
                <MemberCard key={member.id} {...member} />
            ))}
        </div>
    );
};
