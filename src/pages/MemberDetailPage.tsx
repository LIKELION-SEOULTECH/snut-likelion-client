import { ProjectBox } from "@/components/home/ProjectBox";
import { OrangeBtn } from "@/components/Member/OrangeBtn";
import { SmallBtn } from "@/components/Member/SmallBtn";
import { projectList } from "@/constants/home/projectList";
import { mockMemberData } from "@/constants/mockMemberData";
import PageLayout from "@/layouts/PageLayout";
import { useParams } from "react-router-dom";

export const MemberDetailPage = () => {
    const { id } = useParams();
    const member = mockMemberData.find((m) => m.id === Number(id));

    return (
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
                        {/* 왼쪽 - 사진*/}
                        <div className="w-[291px] h-[281px] flex overflow-hidden">
                            <img className="w-full h-full object-contain" src={member.image} />
                        </div>
                        {/* 오른쪽 - 나머지 정보들*/}
                        <div className="flex flex-col">
                            {/* 위 */}
                            <div className="flex flex-col">
                                <div className="flex gap-4 pb-6">
                                    <OrangeBtn tag={member.generation} isNotButton={true} />
                                    <OrangeBtn tag={member.tag} isNotButton={true} />
                                    <OrangeBtn tag={member.role} isNotButton={true} />
                                </div>
                                <h1 className="text-[50px] font-bold pb-10">{member.name}</h1>
                                <div className="text-[#ECECEC] text-[24px] pb-3 font-medium">
                                    {member.description}
                                </div>
                                <div className="text-[#C4C4C4] text-[20px] pb-[32px] 	font-light">
                                    {member.description2}
                                </div>
                                <div className="flex gap-[8px] pb-40">
                                    <SmallBtn tag={"백엔드"} shape={"square"} />
                                    <SmallBtn tag={"기술스텍"} shape={"square"} />
                                    <SmallBtn tag={"뭐있는지"} shape={"square"} />
                                    <SmallBtn tag={"모름"} shape={"square"} />
                                </div>
                            </div>
                            {/* 중간 */}
                            <div className="flex flex-col">
                                <h1 className="text-[32px] font-bold pb-[32px]">참여한 프로젝트</h1>
                                <div className="w-[806px] grid grid-cols-2 gap-[16px] pb-40">
                                    {projectList.map((project) => (
                                        <ProjectBox key={project.id} {...project} />
                                    ))}
                                </div>
                                <div className="flex gap-3 pb-8">
                                    <a
                                        href={member.velog}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <SmallBtn tag={"Velog →"} shape={"round"} />
                                    </a>
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <SmallBtn tag={"Github →"} shape={"round"} />
                                    </a>
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
    );
};
