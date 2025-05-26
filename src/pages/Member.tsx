import CategoryTabs from "@/components/CategoryTabs";
import GenerationTabs from "@/components/GenerationTabs";
import { MemberCardList } from "@/components/Member/MemberCardList";
import PageLayout from "@/layouts/PageLayout";
import { useState } from "react";

const Allgenerations = ["13기", "12기", "11기"];
const MemberCategories = ["운영진", "아기사자"];

export const MemberPage = () => {
    const [generation, setGeneration] = useState("13기");
    const [categorie, setCategory] = useState("운영진");
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
                    generations={Allgenerations}
                    selected={generation}
                    onSelect={setGeneration}
                />
                <CategoryTabs
                    categories={MemberCategories}
                    selected={categorie}
                    onSelect={setCategory}
                />
                <MemberCardList />
                {/* <QuoteCardList /> */}
            </div>
        </PageLayout>
    );
};
