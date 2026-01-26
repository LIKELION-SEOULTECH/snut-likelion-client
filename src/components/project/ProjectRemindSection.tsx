import { ProjectReminderBox } from "./ProjectReminderBox";
import type { RetrospectionResponse } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { getRetrospections } from "@/apis/main/project";
import { Skeleton } from "../ui/skeleton";

interface ProjectReminderSectionProps {
    projectId: number;
    projectGen: number;
}

export const ProjectReminderSection = ({ projectId, projectGen }: ProjectReminderSectionProps) => {
    const navigate = useNavigate();

    const { data: retrospections, isLoading: isRetrospectionLoading } = useQuery<
        RetrospectionResponse[]
    >({
        queryKey: ["retrospections", projectId],
        queryFn: () => getRetrospections(projectId),
        enabled: !!projectId
    });

    return (
        <div className="flex flex-col gap-8">
            <div
                className="font-bold text-[32px] leading-[130%] tracking-[-0.02em]
"
            >
                프로젝트 회고
            </div>
            {isRetrospectionLoading ? (
                <div className="grid grid-cols-2 gap-4 w-[1216px]">
                    <Skeleton className="h-[150px] w-full rounded-md" />
                    <Skeleton className="h-[150px] w-full rounded-md" />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 w-[1216px]">
                    {retrospections?.map((item) => (
                        <ProjectReminderBox
                            key={item.id}
                            name={item.writer.name}
                            part={item.writer.part}
                            content={item.content}
                            onClick={() => {
                                navigate(`/members/${item.writer.id}`, {
                                    state: {
                                        member: {
                                            generation: projectGen,
                                            id: item.writer.id
                                        }
                                    }
                                });
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
