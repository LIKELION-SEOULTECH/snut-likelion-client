import { useNavigate } from "react-router-dom";
import { OrangeBtn } from "../Member/OrangeBtn";
import { SmallBtn } from "@/components/Member/SmallBtn";
import { MyBlog } from "./MyBlog";
import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import { ROUTES } from "@/routes/routes";
import { ProjectBox } from "../home/ProjectBox";
import { useState } from "react";
import { ProjectBoxSkeleton } from "../project/ProjectBoxSkeleton";

const partMap: { [key: string]: string } = {
    프론트엔드: "front-end",
    백엔드: "back-end",
    디자인: "designer",
    기획: "planner",
    AI: "A.I"
};

const nameMap: { [key: string]: string } = {
    GITHUB: "GitHub",
    NOTION: "Notion",
    BEHANCE: "Behance",
    BLOG: "Blog",
    INSTAGRAM: "Instagram",
    OTHER: "Other"
};

type MemberProps = {
    member: MemberDetailResponse | undefined;
    lionInfo: LionInfoDetailsResponse | undefined;
    selectedGeneration: number | null;
    setSelectedGeneration: (value: number) => void;
    memberLoading: boolean;
    lionInfoLoading: boolean;
};

export const MemberMyPage = ({
    member,
    lionInfo,
    memberLoading,
    lionInfoLoading,
    selectedGeneration,
    setSelectedGeneration
}: MemberProps) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (gen: number) => {
        setSelectedGeneration(gen);
        setShowDropdown(false);
    };

    return (
        <div className="flex flex-1 h-auto ">
            <div className="flex flex-col w-full">
                {/* 기본 정보 */}
                <div className="flex w-full justify-between pb-8 items-center">
                    <h2 className="text-[28px] font-bold">기본 소개</h2>
                    <p
                        className="text-[#7F7F7F] cursor-pointer"
                        onClick={() => {
                            navigate("/mypage-edit", {
                                state: {
                                    member,
                                    lionInfo,
                                    selectedGeneration
                                }
                            });
                        }}
                    >
                        수정하기
                    </p>
                </div>

                {memberLoading ? (
                    <div className="w-full text-center text-[#A7A7A7] text-[24px] pt-10 min-h-[480px]">
                        내 소개를 불러오는 중...
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <div className="flex gap-4 pb-6 flex-wrap">
                            {/* 기수 여러개.. */}
                            {member?.generations.length && member?.generations.length > 1 ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="bg-orange-500 text-black font-bold px-4 py-2 rounded-full text-2xl"
                                    >
                                        {selectedGeneration}기 ▾
                                    </button>

                                    {showDropdown && (
                                        <div className="absolute left-0 mt-2 bg-gray-500 text-white rounded-[12px] shadow-lg z-10 w-[100px] flex flex-col overflow-hidden">
                                            {member?.generations.map((gen) => (
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
                                    tag={`${member?.generations?.[0] ?? ""}기`}
                                    isNotButton={true}
                                />
                            )}
                            {lionInfo && (
                                <div className="flex gap-4">
                                    <OrangeBtn tag={lionInfo.role} isNotButton={true} />
                                    <OrangeBtn
                                        tag={partMap[lionInfo.part] ?? lionInfo.part}
                                        isNotButton={true}
                                    />
                                </div>
                            )}
                        </div>
                        <h1 className="text-[50px] my-0 text-[#fff] font-bold pb-10">
                            {member?.name}
                        </h1>
                        <div className="min-h-[200px]">
                            {member?.intro || member?.description ? (
                                <>
                                    <div className="text-[#ECECEC] text-[24px] pb-3 font-medium">
                                        {member.intro}
                                    </div>
                                    <div className="text-[#C4C4C4] text-[20px] pb-[32px] font-light">
                                        {member.description}
                                    </div>
                                </>
                            ) : (
                                <div className="w-full text-center text-[#A7A7A7] text-[24px] pt-10">
                                    아직 작성된 소개가 없어요
                                </div>
                            )}
                        </div>

                        <div className="flex gap-[8px] pb-30 flex-wrap">
                            {member?.stacks?.map((stack, index) => (
                                <SmallBtn key={index} tag={stack} shape="square" />
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col">
                    <div className="flex justify-between ">
                        <h1 className="text-[32px] my-0 text-[#fff] font-bold pb-[32px]">
                            참여한 프로젝트
                        </h1>
                        {!lionInfoLoading && (
                            <span
                                className="text-[20px]  text-[#7F7F7F] mt-2 cursor-pointer "
                                onClick={() => {
                                    navigate(ROUTES.PROJECT_NEW);
                                }}
                            >
                                업로드
                            </span>
                        )}
                    </div>
                    {memberLoading || lionInfoLoading ? (
                        <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <ProjectBoxSkeleton key={`skeleton-${idx}`} />
                            ))}
                        </div>
                    ) : (
                        <div className="w-[806px] pb-40">
                            <div className="grid grid-cols-2 gap-[16px] ">
                                {lionInfo?.projects?.length !== 0
                                    ? lionInfo?.projects?.reverse().map((project) => (
                                          <ProjectBox
                                              generation={selectedGeneration!}
                                              key={project.id}
                                              {...{
                                                  id: project.id,
                                                  name: project.name,
                                                  thumbnailUrl: project.thumbnailUrl
                                              }}
                                          />
                                      ))
                                    : null}
                            </div>
                        </div>
                    )}
                    {!lionInfoLoading && lionInfo?.projects?.length === 0 && (
                        <div className="w-full pb-30 text-center text-[#A7A7A7] text-[24px]">
                            업로드한 프로젝트가 없습니다
                        </div>
                    )}

                    <div className="flex justify-between">
                        <h1 className="text-[32px] my-0 text-[#fff] font-bold pb-[19px]">
                            내가 쓴 블로그
                        </h1>
                        <span
                            className="text-[20px]  text-[#7F7F7F] mt-2 cursor-pointer "
                            onClick={() => {
                                navigate(ROUTES.BLOG_POST);
                            }}
                        >
                            업로드
                        </span>
                    </div>
                    <MyBlog />

                    {!memberLoading && (
                        <div className="flex gap-3 pb-8 flex-wrap">
                            {member?.portfolioLinks?.map((link) => (
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
                    )}
                </div>
            </div>
        </div>
    );
};
