import { ProjectBox } from "@/components/home/ProjectBox";
import { OrangeBtn } from "@/components/Member/OrangeBtn";
import { SmallBtn } from "@/components/member/SmallBtn";
import samplePRF from "@/assets/Member/samplePRFIMG.png";

import { ROUTES } from "@/routes/routes";
import PageLayout from "@/layouts/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import DirectoryIcon from "@/assets/project/directory-icon.svg?react";
import { useEffect, useState } from "react";
import { fetchLionInfo, fetchMemberDetail } from "@/apis/main/member";
import type { MemberDetailResponse, MemberResponse } from "@/types/members";

import { useLocation } from "react-router-dom";
import type { ParticipatingProject } from "@/types/member";

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

export const MemberDetailPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [member, setMember] = useState<(MemberDetailResponse & Partial<MemberResponse>) | null>(
        null
    );

    const [projects, setProjects] = useState<ParticipatingProject[]>([]);
    const [loadingMember, setLoadingMember] = useState(true);

    const location = useLocation();
    const fallbackData = location.state?.member;

    useEffect(() => {
        if (!id) return;

        const getMember = async () => {
            const data = await fetchMemberDetail(Number(id));
            setMember({
                ...data,
                ...fallbackData // 기수, 파트, 역할 데이터 보충해주기 ,,,,
            });
            console.log(fallbackData);
        };

        if (id) getMember();
        console.log("Fallback data:", fallbackData);
    }, [id, fallbackData]);

    useEffect(() => {
        const loadProjects = async () => {
            if (!id || !fallbackData?.generation) return;

            const lionInfo = await fetchLionInfo(Number(id), fallbackData.generation);
            setProjects(lionInfo.projects ?? []);
            setLoadingMember(false);
        };

        loadProjects();
    }, [id, fallbackData?.generation]);

    return (
        <div>
            <PageLayout>
                <div
                    className="whitespace-pre-line leading-snug  w-full flex flex-col text-white  items-center px-[112px] py-[132px]"
                    style={{
                        background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)"
                    }}
                >
                    {loadingMember && (
                        <div className="p-10 text-[#C4C4C4] h-[75vh] w-full flex justify-center items-center ">
                            <h1 className="text-2xl  font-semibold">로딩중...</h1>
                        </div>
                    )}
                    {!loadingMember && member && (
                        // 정보 o 경우
                        <div className="flex w-full h-auto gap-[119px]">
                            <div className=" relative w-[291px]">
                                <div className="flex flex-row absolute -top-8 left-0 w-[291px] text-xl text-[#7F7F7F] gap-1">
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            navigate(ROUTES.MEMBER);
                                        }}
                                    >
                                        멤버
                                    </span>
                                    <span className="flex items-center">
                                        <DirectoryIcon />
                                    </span>
                                    <span>{member.name}</span>
                                </div>
                                {/* 왼쪽 - 사진*/}
                                <div className="w-[291px] h-[281px] flex overflow-hidden">
                                    {member.profileImageUrl ? (
                                        <img
                                            className="w-full h-full object-contain"
                                            src={member.profileImageUrl}
                                        />
                                    ) : (
                                        <img
                                            src={samplePRF}
                                            alt="프로필 이미지"
                                            width={291}
                                            height={281}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* 오른쪽 - 나머지 정보들*/}
                            <div className="flex flex-col">
                                {/* 위 */}
                                <div className="flex flex-col">
                                    <div className="flex gap-4 pb-6">
                                        {/* **** 기수 여러개 -> ui 수정필요 ******* */}

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
                                        <div className="text-[#C4C4C4] text-[20px] pb-[32px] 	font-light">
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
                                    <h1 className="text-[32px] my-0 text-[#fff] font-bold pb-[32px]">
                                        참여한 프로젝트
                                    </h1>
                                    <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                                        {projects.length > 0 ? (
                                            projects
                                                .reverse()
                                                .map((project) => (
                                                    <ProjectBox
                                                        key={project.id}
                                                        generation={fallbackData.generation}
                                                        {...project}
                                                    />
                                                ))
                                        ) : (
                                            <div className="text-[#7F7F7F] text-lg col-span-2">
                                                참여한 프로젝트가 없습니다.
                                            </div>
                                        )}
                                    </div>
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
                    )}
                    {!loadingMember && !member && (
                        // 정보 x 경우
                        <div className="p-10 text-[#C4C4C4] h-[75vh] w-full flex justify-center items-center ">
                            <h1 className="text-2xl font-semibold">멤버를 찾을 수 없어요 </h1>
                        </div>
                    )}
                </div>
            </PageLayout>
        </div>
    );
};
