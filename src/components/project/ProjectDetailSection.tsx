import { categoryMap, type projectDetail } from "@/types/project";

export const ProjectDetailSection = ({ project }: { project: projectDetail }) => {
    return (
        <div className="flex flex-col mt-18">
            <div className="flex flex-row gap-4">
                <div className="h-12 px-5 rounded-full text-2xl bg-[#F70] text-black font-bold flex items-center justify-center">
                    {project.generation}기
                </div>
                <div className="h-12 px-5 rounded-full text-2xl bg-[#F70] text-black font-bold flex items-center justify-center">
                    {categoryMap[project.category] ?? project.category}
                </div>
            </div>
            <div className="text-[50px] font-bold text-white mt-6"> {project.name}</div>
            <div className="flex flex-row gap-3 mt-6">
                {project.tags?.map((e, idx) => {
                    return (
                        <div
                            key={idx}
                            className="flex items-center justify-center px-4 text-base h-9 bg-[#2d2d2d] text-gray-100 rounded-[4px]"
                        >
                            {e}
                        </div>
                    );
                })}
            </div>
            <div className="mt-10">
                <div className="text-medium text-2xl text-[#ECECEC]">{project.intro}</div>
                <div className="text-light text-xl text-[#C4C4C4] mt-3 leading-[150%]">
                    <p>{project.description}</p>
                </div>
            </div>
            <div className="flex flex-row gap-3 mt-9">
                {project.playstoreUrl && (
                    <a href={project.playstoreUrl} target="_blank" rel="noopener noreferrer">
                        <div className="flex justify-center items-center px-4 h-11 text-base font-medium leading-[150%] rounded-full bg-[#404040] cursor-pointer">
                            Play Store →
                        </div>
                    </a>
                )}
                {project.appstoreUrl && (
                    <a href={project.appstoreUrl} target="_blank" rel="noopener noreferrer">
                        <div className="flex justify-center items-center px-4 h-11 text-base font-medium leading-[150%] rounded-full bg-[#404040] cursor-pointer">
                            App Store →
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
};
