import { useNavigate } from "react-router-dom";
interface ProjectBoxProps {
    id: number;
    title: string;
    description: string;
    class: string;
    tag: string;
    image: string;
    stack: string[];
    rounded?: string;
}

export const ProjectBox = ({
    id,
    title,
    description,
    class: projectClass,
    tag,
    image,
    stack
}: ProjectBoxProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/project/${id}`)}
            className="relative w-[395px] h-[286px] text-[#ffffff] rounded-[16px]"
        >
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover rounded-[16px]"
            ></img>
            {/* hover했을때 */}
            <div className="absolute top-0 left-0 w-[395px] h-[286px] rounded-[12px] opacity-0 bg-[#00000099] hover:opacity-100 transition-opacity duration-300 flex flex-col p-[24px] backdrop-blur-[12px]">
                {/* 상단: 기수.태그 */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="bg-[#C4C4C4] text-[#3A3A3A] px-3 py-1 rounded-full text-[16px] leading-[150%] font-medium">
                        {projectClass}
                    </span>
                    <span className="bg-[#C4C4C4] text-[#3A3A3A] px-3 py-1 rounded-full text-[16px] leading-[150%] font-medium">
                        {tag}
                    </span>
                    {stack.map((tech: string, i: number) => (
                        <span
                            key={i}
                            className="bg-[#C4C4C4] text-[#3A3A3A] px-3 py-1 rounded-full text-[16px] leading-[150%] font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* 하단:제목.설명 */}
                <div className="text-white pt-[73px]">
                    <h4 className="text-[24px] text-[#FFFFFF] font-semibold">{title}</h4>
                    <p className="text-[#C4C4C4] text-[20px] mt-2 leading-snug line-clamp-3">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};
