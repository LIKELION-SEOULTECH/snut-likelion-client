import { fetchMembers } from "@/apis/main/member";
import CategoryTabs from "@/components/Member/CategoryTabs";

import GenerationTabs from "@/components/Member/GenerationTabs";

import { MemberCardList } from "@/components/Member/MemberCardList";
import QuoteCardList from "@/components/project/QuoteCardList";

import PageLayout from "@/layouts/PageLayout";
import type { MemberResponse } from "@/types/members";
import { useEffect, useState } from "react";

const extractGenerations = (members: MemberResponse[]): string[] => {
    const genSet = new Set<number>();
    members.forEach((member) => genSet.add(member.generation));
    const gens = Array.from(genSet).sort((a, b) => b - a);
    return gens.map((g) => `${g}기`);
};

const MemberCategories = ["운영진", "아기사자"];

export const MemberPage = () => {
    const [generation, setGeneration] = useState("13기");
    const [generationList, setGenerationList] = useState<string[]>([]); // 전체 리스트
    const [category, setCategory] = useState("운영진");
    const [members, setMembers] = useState<MemberResponse[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const genNumber = Number(generation.replace("기", ""));
                const isManager = category === "운영진";

                const data = await fetchMembers({
                    generation: genNumber,
                    isManager
                });

                setMembers(data);

                const gens = extractGenerations(data);
                setGenerationList(gens);
            } catch (err) {
                console.error("멤버 불러오기 실패:", err);
            }
        };

        fetchData();
    }, [generation, category]);

    return (
        <PageLayout>
            <div
                className="w-full  flex flex-col text-white bg-[#111111] items-center px-28"
                style={{
                    background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className="font-extrabold text-7xl mt-[85px] mb-18">
                    LikeLion Member<span className="text-[#FF7700]">.</span>
                </div>
                <GenerationTabs
                    generations={generationList}
                    selected={generation}
                    onSelect={setGeneration}
                />
                <CategoryTabs
                    categories={MemberCategories}
                    selected={category}
                    onSelect={setCategory}
                />
                <MemberCardList MemberData={members} />
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
