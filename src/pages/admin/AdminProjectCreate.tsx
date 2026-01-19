import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Plus } from "lucide-react";
import { ImageUpload } from "@/components/admin/project/ImageUpload";

import { useNavigate } from "react-router-dom";
import { createAdminProject } from "@/apis/admin/project";
import { StackInput } from "@/components/my-page/StackInput";
import { ProjectCreateCancelModal } from "@/components/admin/project/ProjectCreateCancelModal";
import { ADMIN_ABS } from "@/routes/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomSelect } from "@/components/admin/common/custom-select";
import type { Retro } from "@/types/project";
import { RetroRow } from "@/components/admin/project/RetroRow";

export const AdminProjectCreatePage = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
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

    const [showCreateCancelModal, setShowCreateCancelModal] = useState(false);

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

    const isDirty =
        name.trim() !== "" ||
        intro.trim() !== "" ||
        projectDescription.trim() !== "" ||
        images.length > 0 ||
        tags.length > 0 ||
        retros.some((r) => r.memberId !== null || r.comment.trim() !== "");

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
        retros.every((r) => r.memberId !== null && r.comment.trim() !== "") &&
        images.length >= 0;

    const createProjectMutation = useMutation({
        mutationFn: (formData: FormData) => createAdminProject(formData),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminProjects"]
            });

            navigate(ADMIN_ABS.PROJECT);
        },

        onError: () => {
            alert("프로젝트 생성 실패");
        }
    });

    const handleCreateProject = () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("intro", intro);
        formData.append("description", projectDescription);
        formData.append("generation", String(Number(generation)));
        formData.append("category", category);

        if (webUrl) formData.append("websiteUrl", webUrl);
        if (iosUrl) formData.append("appstoreUrl", iosUrl);
        if (androidUrl) formData.append("playstoreUrl", androidUrl);

        tags.forEach((tag) => formData.append("tags", tag));

        retros.forEach((retro, index) => {
            if (retro.memberId !== null) {
                formData.append(`retrospections[${index}].memberId`, String(retro.memberId));
                formData.append(`retrospections[${index}].content`, retro.comment);
            }
        });

        images.forEach((img) => {
            formData.append("images", img);
        });

        createProjectMutation.mutate(formData);
    };

    const handleBackBtn = () => {
        if (!isDirty) {
            navigate(ADMIN_ABS.PROJECT);
        } else {
            setShowCreateCancelModal(true);
        }
    };

    return (
        <AdminLayout
            isFormValid={isFormValid}
            onSubmit={handleCreateProject}
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
                    <ImageUpload onImagesChange={setImages} />
                </div>
            </div>

            <ProjectCreateCancelModal
                open={showCreateCancelModal}
                onClose={() => {
                    setShowCreateCancelModal(false);
                }}
                onConfirm={() => {
                    setShowCreateCancelModal(false);
                    navigate(ADMIN_ABS.PROJECT);
                }}
            />
        </AdminLayout>
    );
};
