import { useEffect, useState } from "react";
import { OrangeBtn } from "@/components/Member/OrangeBtn";
import { SmallBtn } from "@/components/Member/SmallBtn";
import { MyBlog } from "./MyBlog";
import { fetchLionInfo } from "@/apis/members";
import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ProjectBox } from "../home/ProjectBox";

const partMap = {
    프론트엔드: "front-end",
    백엔드: "back-end",
    디자인: "designer",
    기획: "planner",
    AI: "A.I"
};

const nameMap = {
    GITHUB: "GitHub",
    NOTION: "Notion",
    BEHANCE: "Behance",
    BLOG: "Blog",
    INSTAGRAM: "Instagram",
    OTHER: "Other"
};

type MyProps = {
    member: MemberDetailResponse;
    selectedGeneration: number;
    setSelectedGeneration: (value: number) => void;
};

export const MyPageMain = ({ member, selectedGeneration, setSelectedGeneration }: MyProps) => {
    const [lionInfo, setLionInfo] = useState<LionInfoDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (gen: number) => {
        setSelectedGeneration(gen);
        setShowDropdown(false);
    };

    useEffect(() => {
        const loadLionInfo = async () => {
            const lionData = await fetchLionInfo(member.id, selectedGeneration);
            setLionInfo(lionData);
            setLoading(false);
        };

        loadLionInfo();
    }, [member.id, selectedGeneration]);

    if (loading || !lionInfo) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center text-xl">
                내 정보를 불러오는 중...
            </div>
        );
    }

    return (
        <div className="flex flex-1 h-auto ">
            <div className="flex flex-col">
                {/* 기본 정보 */}
                <div className="flex flex-col">
                    <div className="flex gap-4 pb-6 flex-wrap">
                        {/* 기수 여러개.. */}
                        {member.generations.length > 1 ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="bg-orange-500 text-black font-bold px-4 py-2 rounded-full text-2xl"
                                >
                                    {selectedGeneration}기 ▾
                                </button>

                                {showDropdown && (
                                    <div className="absolute left-0 mt-2 bg-gray-500 text-white rounded-[12px] shadow-lg z-10 w-[100px] flex flex-col overflow-hidden">
                                        {member.generations.map((gen) => (
                                            <button
                                                key={gen}
                                                onClick={() => handleSelect(gen)}
                                                className="hover:bg-orange-400 px-2 py-2 text-[24px] text-black font-bold"
                                            >
                                                {gen}기
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            // 기수 한개

                            <OrangeBtn
                                tag={`${member.generations?.[0] ?? ""}기`}
                                isNotButton={true}
                            />
                        )}
                        <OrangeBtn tag={lionInfo.role} isNotButton={true} />
                        <OrangeBtn
                            tag={partMap[lionInfo.part] ?? lionInfo.part}
                            isNotButton={true}
                        />
                    </div>
                    <h1 className="text-[50px] my-0 text-[#fff] font-bold pb-10">{member.name}</h1>
                    <div className="min-h-[200px]">
                        <div className="text-[#ECECEC] text-[24px] pb-3 font-medium">
                            {member.intro}
                        </div>
                        <div className="text-[#C4C4C4] text-[20px] pb-[32px] font-light">
                            {member.description}
                        </div>
                    </div>

                    <div className="flex gap-[8px] pb-30 flex-wrap">
                        {member.stacks?.map((stack, index) => (
                            <SmallBtn key={index} tag={stack} shape="square" />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-between ">
                        <h1 className="text-[32px] my-0 text-[#fff] font-bold pb-[32px]">
                            참여한 프로젝트
                        </h1>
                        <span
                            className="text-[20px] underline text-[#7F7F7F] mt-2 cursor-pointer "
                            onClick={() => {
                                navigate(ROUTES.PROJECT_NEW);
                            }}
                        >
                            업로드
                        </span>
                    </div>
                    <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                        {lionInfo.projects?.map((project) => (
                            <ProjectBox
                                key={project.id}
                                generation={selectedGeneration}
                                {...{
                                    id: project.id,
                                    name: project.name,
                                    thumbnailUrl: project.thumbnailUrl
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <h1 className="text-[32px] my-0 text-[#fff] font-bold pb-[19px]">
                            내가 쓴 블로그
                        </h1>
                        <span
                            className="text-[20px] underline text-[#7F7F7F] mt-2 cursor-pointer "
                            onClick={() => {
                                navigate(ROUTES.BLOG_POST);
                            }}
                        >
                            업로드
                        </span>
                    </div>
                    <MyBlog />

                    <div className="flex gap-3 pb-8 flex-wrap">
                        {member.portfolioLinks?.map((link) => (
                            <a
                                key={link.id ?? link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SmallBtn
                                    tag={`${nameMap[link.name] ?? link.name} →`}
                                    shape="round"
                                />
                            </a>
                        ))}
                    </div>
                    <a
                        href={`mailto:${member.email}`}
                        className="text-[56px] w-[390px] h-[73px] font-bold cursor-pointer hover:border-b-6 px-0"
                    >
                        Contact me<span className="text-[#F70]">.</span> →
                    </a>
                </div>
            </div>
        </div>
    );
};
