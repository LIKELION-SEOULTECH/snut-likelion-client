import CategoryTabs from "@/components/Member/CategoryTabs";
import GenerationTabs from "@/components/Member/GenerationTabs";
import { MemberCardList } from "@/components/Member/MemberCardList";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";
import { useMembers } from "@/hooks/useMembers";
import { useState } from "react";
import { getGenerationListByYear } from "@/utils/getGenerationList";

const MemberCategories = ["운영진", "아기사자"];

export const MemberPage = () => {
    const generationList = getGenerationListByYear(2025, 13);
    const [generation, setGeneration] = useState(generationList[0]);
    const [category, setCategory] = useState("운영진");

    const genNumber = Number(generation.replace("기", ""));
    const isManager = category === "운영진";

    const { data: members, isLoading, isError } = useMembers({ generation: genNumber, isManager });

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
                {isLoading && <div className="text-white mt-12">로딩 중...🦁</div>}
                {isError && <div className="text-white mt-12">멤버를 불러오는데 실패했습니다.</div>}
                {members && <MemberCardList MemberData={members} />}
                <div className="w-full mt-24">
                    <QuoteCardList />
                </div>
            </div>
        </PageLayout>
    );
};
