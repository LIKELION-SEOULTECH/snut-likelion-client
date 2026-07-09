import { RoleCard } from "./RoleCard";
import { manegerMockCardData, mockCardData } from "@/constants/home/mockCardData";
import type { RoleCardProps } from "@/types/home";
import { useState } from "react";
import { RoleDetailModal } from "./RoleDetailModal";

export const RoleList = () => {
    const [selectedRole, setSelectedRole] = useState<RoleCardProps | null>(null);

    const top = mockCardData.slice(0, 3);
    const bottom = mockCardData.slice(3);

    return (
        <>
            <div className="hidden sm:flex flex-row gap-[6px] sm:gap-4">
                {mockCardData.map((card: RoleCardProps, index: number) => (
                    <RoleCard key={index} {...card} />
                ))}
            </div>

            {/* 모바일 */}
            <div className="flex sm:hidden flex-col gap-[6px] mx-5">
                {/* 위 (1,2,3) */}
                <div className="flex gap-[6px]">
                    {top.map((card, index) => (
                        <RoleCard
                            key={index}
                            {...card}
                            onDetailClick={() => setSelectedRole(card)}
                        />
                    ))}
                </div>

                {/* 아래 (4,5) */}
                <div className="flex gap-[6px] justify-center">
                    {bottom.map((card, index) => (
                        <RoleCard
                            key={index}
                            {...card}
                            onDetailClick={() => setSelectedRole(card)}
                        />
                    ))}
                </div>
            </div>
            <RoleDetailModal role={selectedRole} onClose={() => setSelectedRole(null)} />
        </>
    );
};

export const ManegerRoleLIst = () => {
    const [selectedRole, setSelectedRole] = useState<RoleCardProps | null>(null);

    return (
        <>
            <div className="flex flex-row gap-[6px] sm:gap-4 mx-5">
                {manegerMockCardData.map((card: RoleCardProps, index: number) => (
                    <RoleCard
                        key={index}
                        isManeger={true}
                        {...card}
                        onDetailClick={() => setSelectedRole({ ...card, isManeger: true })}
                    />
                ))}
            </div>

            <RoleDetailModal role={selectedRole} onClose={() => setSelectedRole(null)} />
        </>
    );
};
