import { RoleCard } from "./RoleCard";
import { manegerMockCardData, mockCardData } from "@/constants/home/mockCardData";
import type { RoleCardProps } from "@/types/home";

export const RoleList = () => {
    return (
        <div className="flex flex-row gap-[6px] sm:gap-4">
            {mockCardData.map((card: RoleCardProps, index: number) => (
                <RoleCard key={index} {...card} />
            ))}
        </div>
    );
};

export const ManegerRoleLIst = () => {
    return (
        <div className="flex flex-row gap-4">
            {manegerMockCardData.map((card: RoleCardProps, index: number) => (
                <RoleCard isManeger={true} key={index} {...card} />
            ))}
        </div>
    );
};
