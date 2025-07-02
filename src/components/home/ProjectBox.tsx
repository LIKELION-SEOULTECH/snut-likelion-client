import { categoryMap } from "@/types/project";
import { useNavigate } from "react-router-dom";
import type { ProjectCategory } from "@/types/project";

interface ProjectBoxProps {
    id: number;
    name: string;
    description?: string;
    generation?: number;
    category?: ProjectCategory;
    tags?: string[];

    thumbnailUrl: string;
    rounded?: string;
}

export const ProjectBox = ({
    id,
    name,
    description,
    generation,
    category,
    // tags,
    thumbnailUrl
}: ProjectBoxProps) => {
    const navigate = useNavigate();

    return (
        <div className="relative text-[#ffffff] rounded-[16px]">
            <div
                onClick={() => navigate(`/project/${id}`)}
                className="w-60 sm:w-[395px] h-[170px] sm:h-[286px] text-[#ffffff] rounded-[16px] cursor-pointer"
            >
                <img
                    // *** 여기 주석 부분 3줄 ****//
                    // 웹 부분꺼임(지우지마유)
                    src={thumbnailUrl}
                    alt={name}
                    //**** 모바일 부분 ***//
                    //   src={image}
                    //   alt={title}
                    className="w-full h-full object-cover rounded-[9.6px] sm:rounded-[16px]"
                    //
                />
                {/* hover했을때 */}
                <div className="hidden sm:flex absolute top-0 left-0 w-[395px] h-[286px] rounded-[12px] opacity-0 bg-[#00000099] hover:opacity-100 transition-opacity duration-300 flex-col p-[24px] backdrop-blur-[12px]">
                    {/* 상단: 기수.태그 */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="bg-[#C4C4C4] text-[#3A3A3A] px-3 py-1 rounded-full text-[16px] leading-[150%] font-medium">
                            {generation}기
                        </span>
                        {category !== undefined ? (
                            <span className="bg-[#C4C4C4] text-[#3A3A3A] px-3 py-1 rounded-full text-[16px] leading-[150%] font-medium">
                                {categoryMap[category] ?? category}
                            </span>
                        ) : null}
                        {/* {Array.isArray(tags) &&
                            tags.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="bg-[#C4C4C4] text-[#3A3A3A] px-3 py-1 rounded-full text-[16px] leading-[150%] font-medium"
                                >
                                    {tech}
                                </span>
                            ))} */}
                    </div>

                    {/* 하단: 제목.설명 */}
                    <div className="text-white pt-[73px]">
                        <h4 className="text-[24px] text-[#FFFFFF] font-semibold">{name}</h4>
                        <p className="text-[#C4C4C4] text-[20px] mt-2 leading-snug line-clamp-3">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
