import { ProjectBox } from "@/components/home/ProjectBox";
import { OrangeBtn } from "@/components/Member/OrangeBtn";
import { SmallBtn } from "@/components/Member/SmallBtn";
import { projectList } from "@/constants/home/projectList";

import { ROUTES } from "@/constants/routes";
import PageLayout from "@/layouts/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import DirectoryIcon from "@/assets/project/directory-icon.svg?react";
import { useEffect, useState } from "react";
import { fetchMemberDetail } from "@/apis/members";
import type { MemberDetailResponse, MemberResponse } from "@/types/members";

import { useLocation } from "react-router-dom";

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
    PM: "planner"
};

export const MemberDetailPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [member, setMember] = useState<(MemberDetailResponse & Partial<MemberResponse>) | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const location = useLocation();
    const fallbackData = location.state?.member;

    useEffect(() => {
        const getMember = async () => {
            try {
                const data = await fetchMemberDetail(Number(id));
                setMember({
                    ...data,
                    ...fallbackData // 기수, 파트, 역할 데이터 보충해주기 ,,,,
                });
            } catch (err) {
                console.error("멤버 조회 실패", err);
                setError(true);

                setMember(fallbackData ?? null); // fallback이라도 쓰기
            } finally {
                setLoading(false);
            }
        };

        if (id) getMember();
        console.log("Fallback data:", fallbackData);
    }, [id, fallbackData]);

    if (loading) {
        return (
            <PageLayout>
                <div className="text-white h-[80vh] flex justify-center items-center text-xl">
                    불러오는 중...
                </div>
            </PageLayout>
        );
    }

    if (error || !member) {
        return (
            <PageLayout>
                <div className="p-10 text-[#fff] h-[75vh] w-full flex justify-center items-center ">
                    <h1 className="text-2xl text-[#fff] font-semibold">멤버를 찾을 수 없어요 </h1>
                </div>
            </PageLayout>
        );
    }

    return (
        <div>
            <PageLayout>
                <div
                    className="whitespace-pre-line leading-snug  w-full flex flex-col text-white  items-center px-[112px] py-[132px]"
                    style={{
                        background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)"
                    }}
                >
                    {member ? (
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
                                    <img
                                        className="w-full h-full object-contain"
                                        src={member.profileImageUrl}
                                    />
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
                                    <h1 className="text-[50px] text-[#fff] font-bold pb-10">
                                        {member.name}
                                    </h1>
                                    <div className="text-[#ECECEC] text-[24px] pb-3 font-medium">
                                        {member.intro}
                                    </div>
                                    <div className="text-[#C4C4C4] text-[20px] pb-[32px] 	font-light">
                                        {member.description}
                                    </div>

                                    {/* ******기술스텍추가필요!!! ******/}
                                    <div className="flex gap-[8px] pb-40">
                                        <SmallBtn tag={"백엔드"} shape={"square"} />
                                        <SmallBtn tag={"기술스텍"} shape={"square"} />
                                        <SmallBtn tag={"뭐있는지"} shape={"square"} />
                                        <SmallBtn tag={"모름"} shape={"square"} />
                                    </div>
                                </div>
                                {/* 중간 */}
                                {/* ******플젝도 연결해야함 *******/}
                                <div className="flex flex-col">
                                    <h1 className="text-[32px] font-bold pb-[32px]">
                                        참여한 프로젝트
                                    </h1>
                                    <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                                        {projectList.map((project) => (
                                            <ProjectBox key={project.id} {...project} />
                                        ))}
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
                    ) : (
                        // 정보 x 경우
                        <div className="p-10 text-[#C4C4C4] h-[75vh] w-full flex justify-center items-center ">
                            <h1 className="text-2xl  font-semibold">멤버를 찾을 수 없어요 😥</h1>
                        </div>
                    )}
                </div>
            </PageLayout>
        </div>
    );
};
