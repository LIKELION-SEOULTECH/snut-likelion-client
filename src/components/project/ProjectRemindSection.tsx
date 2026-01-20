import { useEffect, useState } from "react";
import { ProjectReminderBox } from "./ProjectReminderBox";
import type { RetrospectionResponse } from "@/types/project";
import { fetchRetrospections } from "@/apis/projects";
import { useNavigate } from "react-router-dom";

interface ProjectReminderSectionProps {
    projectId: number;
    projectGen: number;
}

export const ProjectReminderSection = ({ projectId, projectGen }: ProjectReminderSectionProps) => {
    const [retrospections, setRetrospections] = useState<RetrospectionResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRetrospections(projectId);
                setRetrospections(data);
            } catch (err) {
                console.error("회고 불러오기 실패:", err);
            }
        };
        fetchData();
    }, [projectId]);
    return (
        <div className="flex flex-col gap-8">
            <div
                className="font-bold text-[32px] leading-[130%] tracking-[-0.02em]
"
            >
                프로젝트 회고
            </div>
            <div className="grid grid-cols-2 gap-4 w-[1216px]">
                {retrospections.map((item) => (
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
        </div>
    );
};
