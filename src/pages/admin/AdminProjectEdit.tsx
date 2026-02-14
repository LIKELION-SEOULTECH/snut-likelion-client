import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { Plus } from "lucide-react";
import { ImageUpload } from "@/components/admin/project/ImageUpload";
import { getProjectDetail, getRetrospections } from "@/apis/main/project";
import type { RetrospectionResponse } from "@/types/project";
import { updateAdminProject } from "@/apis/admin/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StackInput } from "@/components/my-page/StackInput";
import { ADMIN_ABS } from "@/routes/routes";
import { CustomSelect } from "@/components/admin/common/custom-select";
import { RetroRow } from "@/components/admin/project/RetroRow";
interface Retro {
    memberId: number | null;
    memberName: string;
    comment: string;
    query: string;
    filtered: { id: number; name: string }[];
    showDropdown: boolean;
}

const CATEGORY_VALUE_MAP: Record<string, string> = {
    아이디어톤: "IDEATHON",
    "중앙 해커톤": "HACKATHON",
    데모데이: "DEMO_DAY",
    "장기 프로젝트": "LONG_TERM_PROJECT"
};

export const AdminProjectEditPage = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const projectId = useParams<{ id: string }>().id;

    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const [generation, setGeneration] = useState("");
    const [category, setCategory] = useState("");

    const [tags, setTags] = useState<string[]>([]);

    const [projectDescription, setProjectDescription] = useState("");
    const [webUrl, setWebUrl] = useState("");
    const [iosUrl, setIosUrl] = useState("");
    const [androidUrl, setAndroidUrl] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const [retros, setRetros] = useState<Retro[]>([
        {
            memberId: null,
            memberName: "",
            comment: "",
            query: "",
            filtered: [],
            showDropdown: false
        }
    ]);

    const projectIdNum = Number(projectId);

    const { data: projectDetail } = useQuery({
        queryKey: ["adminProject", projectIdNum],
        queryFn: () => getProjectDetail(projectIdNum),
        enabled: !!projectId
    });

    useEffect(() => {
        if (!projectDetail) return;

        const data = projectDetail;

        setName(data.name);
        setIntro(data.intro);
        setProjectDescription(data.description);
        setGeneration(String(data.generation));
        setCategory(CATEGORY_VALUE_MAP[data.category]);
        setWebUrl(data.websiteUrl ?? "");
        setAndroidUrl(data.playstoreUrl ?? "");
        setIosUrl(data.appstoreUrl ?? "");
        setTags(data.tags);
        setImageUrls(data.imageUrls);
    }, [projectDetail]);

    const { data: retrosData } = useQuery({
        queryKey: ["projectRetros", projectIdNum],
        queryFn: () => getRetrospections(projectIdNum),
        enabled: !!projectId
    });

    useEffect(() => {
        if (!retrosData) return;

        const fetched: RetrospectionResponse[] = retrosData;

        setRetros(
            fetched.map(
                (r): Retro => ({
                    memberId: r.writer.id,
                    memberName: r.writer.name,
                    comment: r.content,
                    query: r.writer.name,
                    filtered: [],
                    showDropdown: false
                })
            )
        );
    }, [retrosData]);

    const handleChangeRetro = <K extends keyof Retro>(index: number, field: K, value: Retro[K]) => {
        const updated = [...retros];
        updated[index][field] = value;
        setRetros(updated);
    };

    const handleSelect = (index: number, member: { id: number; name: string }) => {
        setRetros((prev) =>
            prev.map((r, i) =>
                i === index
                    ? {
                          ...r,
                          memberId: member.id,
                          memberName: member.name,
                          query: member.name,
                          showDropdown: false
                      }
                    : r
            )
        );
    };

    const handleAddRetro = () => {
        setRetros((prev) => [
            ...prev,
            {
                memberId: null,
                memberName: "",
                comment: "",
                query: "",
                filtered: [],
                showDropdown: false
            }
        ]);
    };

    const handleRemoveRetro = (index: number) => {
        setRetros((prev) => prev.filter((_, i) => i !== index));
    };

    const isFormValid =
        generation.trim() !== "" &&
        category.trim() !== "" &&
        name.trim() !== "" &&
        intro.trim() !== "" &&
        projectDescription.trim() !== "" &&
        // retros.every((r) => r.memberId !== null && r.comment.trim() !== "") &&
        images.length >= 0;

    const handleBackBtn = () => {
        if (!isFormValid) {
            navigate(ADMIN_ABS.PROJECT);
        } else {
            alert("뭐");
        }
    };

    const updateProjectMutation = useMutation({
        mutationFn: (formData: FormData) => updateAdminProject(projectIdNum, formData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
            queryClient.invalidateQueries({ queryKey: ["adminProject", projectIdNum] });

            alert("프로젝트가 성공적으로 수정되었습니다.");
        },

        onError: () => {
            alert("수정 실패");
        }
    });

    const handleUpdateProject = () => {
        if (!projectId) return;

        const formData = new FormData();

        formData.append("name", name);
        formData.append("intro", intro);
        formData.append("description", projectDescription);
        formData.append("generation", generation);
        formData.append("category", category);

        if (webUrl) formData.append("websiteUrl", webUrl);
        if (iosUrl) formData.append("appstoreUrl", iosUrl);
        if (androidUrl) formData.append("playstoreUrl", androidUrl);

        tags.forEach((tag) => formData.append("tags", tag));

        formData.append(
            "retrospections",
            JSON.stringify(
                retros
                    .filter((r) => r.memberId !== null)
                    .map((r) => ({
                        memberId: r.memberId,
                        content: r.comment
                    }))
            )
        );

        images.forEach((img) => {
            formData.append("newImages", img);
        });

        updateProjectMutation.mutate(formData);
    };

    return (
        <AdminLayout
            isFormValid={isFormValid}
            onDelete={() => {
                alert("삭제 로직 추가");
            }}
            onSubmit={handleUpdateProject}
            onClickBackBtn={handleBackBtn}
        >
            <div className="w-full flex flex-col bg-white mt-11 rounded-sm mb-12 pt-[22px] px-10 pb-10 gap-8">
                <div className="flex flex-row items-center h-11 pl-[169px] gap-2">
                    <div className="w-[86px]">
                        <CustomSelect
                            value={generation}
                            onValueChange={setGeneration}
                            placeholder="기수"
                            selectList={[
                                { label: "12기", value: "12" },
                                { label: "13기", value: "13" },
                                { label: "14기", value: "14" }
                            ]}
                        />
                    </div>
                    <div className="w-[162px]">
                        <CustomSelect
                            value={category}
                            onValueChange={setCategory}
                            placeholder="구분"
                            selectList={[
                                { label: "아이디어톤", value: "IDEATHON" },
                                { label: "해커톤", value: "HACKATHON" },
                                { label: "장기프로젝트", value: "LONG_TERM_PROJECT" }
                            ]}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center">
                        <span className="w-[169px] h-4 flex flex-row gap-[2px] text-sm font-medium text-[#666666]">
                            <span className="flex flex-col justify-center">제목</span>
                            <span className="flex items-start">
                                <span className="w-1 h-1 rounded-full bg-[#ff7700]" />
                            </span>
                        </span>
                        <input
                            className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <span className="w-[169px] h-4 flex flex-row gap-[2px] text-sm font-medium text-[#666666]">
                            <span className="flex flex-col justify-center">한줄 소개</span>
                            <span className="flex items-start">
                                <span className="w-1 h-1 rounded-full bg-[#ff7700]" />
                            </span>
                        </span>
                        <input
                            className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm"
                            onChange={(e) => setIntro(e.target.value)}
                            value={intro}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center">
                            <span className="w-[169px] h-4 flex flex-row gap-[2px] text-sm font-medium text-[#666666]">
                                <span className="flex flex-col justify-center">프로젝트 설명</span>
                                <span className="flex items-start">
                                    <span className="w-1 h-1 rounded-full bg-[#ff7700]" />
                                </span>
                            </span>
                            <div className="relative flex-1">
                                <textarea
                                    maxLength={50}
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    className="h-[86px] px-4 py-3 border border-[#C4C4C4] text-sm rounded-sm w-full resize-none"
                                />
                                <span className="absolute right-[14px] bottom-[10px] text-sm text-[#999999]">
                                    {projectDescription.replace(/\s/g, "").length}/50
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center">
                        <span className="w-[169px] h-4 flex flex-row gap-[2px] text-sm font-medium text-[#666666]">
                            <span className="flex flex-col justify-center">기술 스택</span>
                        </span>
                        <StackInput value={tags} onChange={setTags} color="white-gray" />
                    </div>
                </div>

                {/* 프로젝트 회고 */}
                <div className="flex flex-row items-start">
                    <span className="w-[169px] h-4 flex flex-row gap-[2px] text-sm font-medium text-[#666666] mt-3">
                        <span className="flex flex-col justify-center">프로젝트 회고</span>
                        <span className="flex items-start">
                            <span className="w-1 h-1 rounded-full bg-[#ff7700]" />
                        </span>
                    </span>
                    <div className="flex-1 flex flex-col gap-[10px]">
                        {retros.map((retro, index) => (
                            <RetroRow
                                key={index}
                                retro={retro}
                                index={index}
                                onChange={handleChangeRetro}
                                onSelect={handleSelect}
                                onRemove={index > 0 ? () => handleRemoveRetro(index) : undefined}
                            />
                        ))}

                        <button
                            className="flex flex-row gap-1 w-[73px] h-10 border border-[#ff7700] rounded-sm text-[#ff7700] items-center p-[10px] whitespace-nowrap font-medium"
                            onClick={handleAddRetro}
                        >
                            <Plus />
                            추가
                        </button>
                    </div>
                </div>

                {/* 링크 삽입 */}
                <div className="flex flex-row items-start">
                    <span className="w-[169px] flex flex-col text-sm font-medium text-[#666666] mt-3">
                        <span className="flex flex-col justify-center">링크 삽입</span>
                        <span className="flex flex-col justify-center">(선택)</span>
                    </span>
                    <div className="flex flex-col flex-1 gap-3">
                        <div className="flex flex-row gap-2">
                            <span className="flex w-[118px] px-[14px] items-center border border-[#C4C4C4] text-sm rounded-sm">
                                Web
                            </span>
                            <input
                                className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm text-sm"
                                placeholder="https://"
                                value={webUrl}
                                onChange={(e) => setWebUrl(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="flex w-[118px] px-[14px] items-center border border-[#C4C4C4] text-sm rounded-sm">
                                IOS
                            </span>
                            <input
                                className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm text-sm"
                                placeholder="https://"
                                value={iosUrl}
                                onChange={(e) => setIosUrl(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="flex w-[118px] px-[14px] items-center border border-[#C4C4C4] text-sm rounded-sm">
                                Android
                            </span>
                            <input
                                className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm text-sm"
                                placeholder="https://"
                                value={androidUrl}
                                onChange={(e) => setAndroidUrl(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* 이미지 첨부 */}
                <div className="flex flex-row items-start">
                    <span className="w-[169px] flex flex-row gap-[2px] text-sm font-medium text-[#666666]">
                        <span>
                            <span className="flex flex-col justify-center">이미지 첨부</span>
                            <span className="flex flex-col justify-center">(순서대로)</span>
                        </span>
                        <span className="flex items-start">
                            <span className="w-1 h-1 rounded-full bg-[#ff7700]" />
                        </span>
                    </span>
                    <ImageUpload initialUrls={imageUrls} onImagesChange={setImages} />{" "}
                </div>
            </div>
        </AdminLayout>
    );
};
