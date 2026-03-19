import { categoryMap, type projectDetail } from "@/types/project";

export const ProjectDetailSection = ({ project }: { project: projectDetail }) => {
    return (
        <div className="flex flex-col mt-0 sm:mt-18 text-lg sm:text-2xl">
            <div className="flex flex-row gap-3 sm:gap-4">
                <div className="h-9 sm:h-12 px-[15px] sm:px-5 rounded-full bg-[#F70] text-black font-bold flex items-center justify-center">
                    {project.generation}기
                </div>
                <div className="h-9 sm:h-12 px-[15px] sm:px-5 rounded-full bg-[#F70] text-black font-bold flex items-center justify-center">
                    {categoryMap[project.category] ?? project.category}
                </div>
            </div>
            <span className="text-[37.5px] sm:text-[50px] font-bold text-white mt-[25px] sm:mt-6 leading-[1]">
                {project.name}
            </span>
            <div className="flex flex-row gap-x-[10.41px] gap-y-[15.01px] sm:gap-3 mt-[33px] sm:mt-6 flex-wrap">
                {project.tags?.map((e, idx) => {
                    return (
                        <div
                            key={idx}
                            className="flex items-center justify-center px-[13.63px] sm:px-4 text-[13.63px] sm:text-base h-[31.04px] sm:h-9 bg-[#2d2d2d] text-gray-100 rounded-[4px]"
                        >
                            {e}
                        </div>
                    );
                })}
            </div>
            <div className="mt-[65px] sm:mt-10">
                <div className="font-medium text-lg sm:text-2xl text-[#ECECEC] leading-[1.3]">
                    {project.intro}
                </div>
                <div className="font-light text-lg sm:text-xl text-[#C4C4C4] mt-3 leading-[150%]">
                    <p>{project.description}</p>
                </div>
            </div>
            {(project.playstoreUrl || project.appstoreUrl) && (
                <div className="flex flex-row gap-3 mt-[55px] sm:mt-9">
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
            )}
        </div>
    );
};
