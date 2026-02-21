import type { MemberResponse } from "@/types/members";
import samplePrf from "@/assets/Member/samplePRFIMG.png";
import { memberImageMap } from "@/assets/member/memberImage";

const nameMap = {
    GITHUB: "GitHub",
    NOTION: "Notion",
    BEHANCE: "Behance",
    BLOG: "Blog",
    INSTAGRAM: "Instagram",
    OTHER: "Other"
};

const partMap: Record<string, string> = {
    BACKEND: "백엔드",
    FRONTEND: "프론트엔드",
    DESIGN: "디자인",
    AI: "인공지능",
    PLANNING: "기획"
};

export const MemberCard = ({
    id,
    name,
    generation,
    part,
    role,
    major,
    intro,
    profileImageUrl,
    portfolioLinks
}: MemberResponse) => {
    const dummyImage = memberImageMap[String(id)];
    const imageSrc = profileImageUrl || dummyImage || samplePrf;

    return (
        <div className="whitespace-pre-line leading-snug relative w-[292px] h-[380px] bg-[#121212] border-1 border-[#3A3A3A] rounded-[16px] cursor-pointer">
            <div className="w-full h-full flex flex-col items-center rounded-[16px] py-[36px] px-[28px]  z-1">
                <div className="w-[218px] h-[216px] overflow-hidden ">
                    {imageSrc !== null ? (
                        <img className="w-full h-full object-contain" src={imageSrc} alt={name} />
                    ) : (
                        <img className="w-full h-full object-contain" src={samplePrf} alt={name} />
                    )}
                </div>
                <div className="flex flex-col pt-[28px]      text-center gap-[15px]">
                    <span className="text-[16px] text-[#7F7F7F] font-medium my-0">
                        {partMap[part] ?? part}
                    </span>
                    <h1 className="text-[32px] text-[#FFF] font-semibold my-0">{name}</h1>
                </div>
            </div>

            {/* 호버 - 프로필카드 */}
            <div
                className="opacity-0 hover:opacity-100 border-1 border-[#FFC08A] rounded-[16px] absolute top-0 left-0 z-2 w-full h-full px-[24px] py-[19px] pb-[29px]  transition-opacity duration-200"
                style={{
                    backgroundImage: "linear-gradient(180deg, #FFA454 0%, #FF7700 100%)"
                }}
            >
                <div className="flex flex-col h-full">
                    {/* 윗부분 */}
                    <div className="flex flex-col flex-1">
                        <div className="flex mb-[28px] h-[16px]  gap-4">
                            <b>{generation}기</b>
                            <b>{role}</b>
                            <b>{partMap[part] ?? part}</b>
                        </div>
                        <div className="text-[32px] h-[32px] font-semibold mb-[28px]">{name}</div>
                        <div className="font-normal text-[20px] leading-snug line-clamp-4">
                            {intro}
                        </div>
                    </div>
                    {/* 아랫부분 */}
                    <div className="h-[68px] ">
                        <div className="flex flex-col gap-4 flex-wrap ">
                            <div className="font-medium text-[16px] text-[#FFD5B0]">{major}</div>
                            <div className="flex gap-3  overflow-hidden ">
                                {portfolioLinks.slice(0, 2).map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button className="h-[36px] bg-[#FFC08A] text-[#F70] px-[16px] border-1 border-[#FFD5B0] rounded-full text-[16px] font-semibold shrink-0 whitespace-nowrap">
                                            {nameMap[link.name] ?? link.name} →
                                        </button>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
