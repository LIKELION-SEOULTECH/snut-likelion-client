import { RoleCard } from "./RoleCard";
import { mockCardData } from "@/constants/home/mockCardData";
import type { RoleCardProps } from "@/types/home";

export const RoleList = () => {
    return (
        <div className="flex flex-row gap-4">
            {mockCardData.map((card: RoleCardProps, index: number) => (
                <RoleCard key={index} {...card} />
            ))}
        </div>
    );
};
