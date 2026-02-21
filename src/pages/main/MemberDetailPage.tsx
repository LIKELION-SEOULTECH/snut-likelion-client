import { useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchLionInfo, fetchMemberDetail } from "@/apis/main/member";
import { ProjectBox, type ProjectBoxProps } from "@/components/home/ProjectBox";
import { OrangeBtn } from "@/components/Member/OrangeBtn";
import { SmallBtn } from "@/components/Member/SmallBtn";
import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from "@/layouts/PageLayout";
import { ROUTES } from "@/routes/routes";

import DirectoryIcon from "@/assets/project/directory-icon.svg?react";
import samplePRF from "@/assets/Member/samplePRFIMG.png";
import type { MemberDetailResponse } from "@/types/members";
import { ProjectBoxSkeleton } from "@/components/project/ProjectBoxSkeleton";
import { mock13thProjectData, mockMemberProjectMapping } from "@/constants/mockProjectData";
import { memberImageMap } from "@/utils/memberImage";

const nameMap = {
    GITHUB: "GitHub",
    NOTION: "Notion",
    BEHANCE: "Behance",
    BLOG: "Blog",
    INSTAGRAM: "Instagram",
    OTHER: "Other"
};
const partMap: Record<string, string> = {
    BACKEND: "back-end",
    FRONTEND: "front-end",
    DESIGN: "designer",
    AI: "A.I",
    PLANNING: "planner"
};

const MemberDetailSkeleton = () => (
    <div className="flex w-full h-auto gap-[119px]">
        <div className="relative w-[291px]">
            <div className="flex flex-row absolute -top-8 left-0 w-[291px] text-xl text-[#7F7F7F] gap-1 items-center">
                <span className="cursor-pointer">멤버</span>
                <span className="flex items-center">
                    <DirectoryIcon />
                </span>
            </div>
            <Skeleton className="w-[291px] h-[281px]" />
        </div>

        <div className="flex flex-col">
            <div className="w-full text-left text-[#A7A7A7] text-[24px] pt-10 min-h-[480px]">
                멤버 정보를 불러오는 중...
            </div>
            <h1 className="text-[32px] my-0 text-[#fff] font-bold pb-[32px] mt-25">
                참여한 프로젝트
            </h1>
            <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <ProjectBoxSkeleton key={`skeleton-${idx}`} />
                ))}
            </div>
        </div>
    </div>
);

export const MemberDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const numericId = id ? Number(id) : undefined;
    const fallbackData = location.state?.member;

    const { data: memberData, isLoading: isMemberLoading } = useQuery({
        queryKey: ["member", numericId],
        queryFn: () => fetchMemberDetail(numericId!),
        enabled: !!numericId
    });

    console.log(memberData);
    const { data: lionInfo, isLoading: isLionInfoLoading } = useQuery({
        queryKey: ["lionInfo", numericId, fallbackData?.generation],
        queryFn: () => fetchLionInfo(numericId!, fallbackData.generation),
        enabled: !!numericId && !!fallbackData?.generation
    });
    console.log("멤버 상세 정보:", lionInfo);

    const member: (MemberDetailResponse & { part?: string; role?: string }) | null = useMemo(() => {
        if (!memberData) return null;
        return { ...fallbackData, ...memberData };
    }, [memberData, fallbackData]);

    // const projects = lionInfo?.projects ?? [];
    const gen = 13; // 임시로 13기로 고정, API 수정되면 제거 예정

    const projects = useMemo(() => {
        if (!numericId) return [];

        const projectIds = mockMemberProjectMapping[numericId] || [];

        return projectIds
            .map((projectId) => mock13thProjectData.find((p) => p.id === projectId))
            .filter((p): p is NonNullable<typeof p> => !!p);
    }, [numericId]);

    const dummyImage = numericId ? memberImageMap[String(numericId)] : undefined;

    const profileSrc = member?.profileImageUrl || dummyImage || samplePRF;

    return (
        <PageLayout>
            <div
                className="whitespace-pre-line leading-snug w-full flex flex-col text-white items-center px-[112px] py-[132px]"
                style={{ background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)" }}
            >
                {isMemberLoading ? (
                    <MemberDetailSkeleton />
                ) : member ? (
                    <div className="flex w-full h-auto gap-[119px]">
                        <div className=" relative w-[291px]">
                            <div className="flex flex-row absolute -top-16 left-0 w-[291px] text-xl text-[#7F7F7F] gap-1">
                                <span
                                    className="cursor-pointer"
                                    onClick={() => navigate(ROUTES.MEMBER)}
                                >
                                    멤버
                                </span>
                                <span className="flex items-center">
                                    <DirectoryIcon />
                                </span>
                                <span>{member.name}</span>
                            </div>
                            <div className="w-[291px] h-[281px] flex overflow-hidden">
                                <img
                                    className="w-full h-full object-contain"
                                    src={profileSrc}
                                    alt="프로필 이미지"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="flex flex-col">
                                <div className="flex gap-4 pb-6">
                                    <OrangeBtn
                                        tag={`${member.generations?.[0] ?? ""}기`}
                                        isNotButton={true}
                                    />
                                    {member.role && (
                                        <OrangeBtn tag={member.role} isNotButton={true} />
                                    )}
                                    {member.part && (
                                        <OrangeBtn
                                            tag={partMap[member.part] ?? member.part}
                                            isNotButton={true}
                                        />
                                    )}
                                </div>
                                <h1 className="text-[50px] my-0 text-[#fff] font-bold pb-10">
                                    {member.name}
                                </h1>
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

                            <div className="flex flex-col mt-10">
                                <h1 className="text-[32px] my-0 text-[#fff] font-bold pb-[32px]">
                                    참여한 프로젝트
                                </h1>
                                {isLionInfoLoading ? (
                                    <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                                        <Skeleton className="h-[300px] w-full rounded-lg" />
                                        <Skeleton className="h-[300px] w-full rounded-lg" />
                                    </div>
                                ) : (
                                    <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                                        {projects.length > 0 ? (
                                            projects
                                                .slice() // Create a shallow copy to avoid mutating the original array
                                                .reverse()
                                                .map((project) => (
                                                    <ProjectBox
                                                        key={project.id}
                                                        // generation={fallbackData.generation}
                                                        {...project}
                                                        generation={gen}
                                                        category={
                                                            project.category as ProjectBoxProps["category"]
                                                        }
                                                    />
                                                ))
                                        ) : (
                                            <div className="text-[#7F7F7F] text-lg col-span-2">
                                                참여한 프로젝트가 없습니다.
                                            </div>
                                        )}
                                    </div>
                                )}
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
                ) : (
                    <div className="p-10 text-[#C4C4C4] h-[75vh] w-full flex justify-center items-center ">
                        <h1 className="text-2xl font-semibold">멤버를 찾을 수 없어요</h1>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};
