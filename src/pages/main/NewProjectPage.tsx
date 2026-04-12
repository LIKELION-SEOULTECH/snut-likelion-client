import { StackInput } from "@/components/my-page/StackInput";
import { NewImageDrop } from "@/components/project/NewImageDrop";
import { NewRetrospectionsInput } from "@/components/project/NewRetrospectionsInput";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createProject,
    createRetrospection,
    deleteRetrospection,
    getProjectDetail,
    getRetrospections,
    updateProject
} from "@/apis/main/project";
import type { RetrospectionResponse } from "@/types/project";
import axios from "axios";
import { DropDwon } from "@/components/my-page/DropDown";
import { getGenerationListByYear } from "@/utils/getGenerationList";
import { uploadImages } from "@/apis/main/file"; // 이미 만들어둔거
import { extractKeyFromUrl } from "@/utils/file";

const categoryMap: Record<string, string> = {
    전체: "",
    중앙해커톤: "HACKATHON",
    아이디어톤: "IDEATHON",
    데모데이: "DEMO_DAY",
    "장기 프로젝트": "LONG_TERM_PROJECT"
};

const categoryLabelMap: Record<string, string> = {
    HACKATHON: "중앙해커톤",
    IDEATHON: "아이디어톤",
    DEMO_DAY: "데모데이",
    LONG_TERM_PROJECT: "장기 프로젝트",
    해커톤: "중앙해커톤",
    "중앙 해커톤": "중앙해커톤",
    아이디어톤: "아이디어톤",
    데모데이: "데모데이",
    "장기 프로젝트": "장기 프로젝트"
};

type RetrospectionInput = {
    id?: number;
    memberId: number;
    memberName?: string;
    content: string;
};

const syncRetrospections = async (
    projectId: number,
    originalRetrospections: RetrospectionResponse[],
    nextRetrospections: RetrospectionInput[]
) => {
    const nextById = new Map(
        nextRetrospections
            .filter((retrospection) => retrospection.id)
            .map((retrospection) => [retrospection.id, retrospection])
    );
    const newRetrospections = nextRetrospections.filter((retrospection) => !retrospection.id);

    await Promise.all(
        originalRetrospections.map(async (original) => {
            const next = nextById.get(original.id);

            if (!next || !next.content.trim()) {
                await deleteRetrospection(projectId, original.id);
                return;
            }

            if (next.content.trim() !== original.content.trim()) {
                await deleteRetrospection(projectId, original.id);
                await createRetrospection(projectId, next.content);
            }
        })
    );

    await Promise.all(
        newRetrospections
            .filter((retrospection) => retrospection.content.trim())
            .map((retrospection) => createRetrospection(projectId, retrospection.content))
    );
};

export const NewProjectPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const projectId = Number(id);
    const isEditMode = Number.isFinite(projectId);

    const generationOptions = useMemo(() => {
        const gens = getGenerationListByYear(2025, 13);
        return gens.map(String);
    }, []);

    const [selectedGen, setSelectedGen] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [description, setDescription] = useState("");

    const [tags, setTags] = useState<string[]>([]);

    const [websiteUrl, setWebsiteUrl] = useState("");
    const [playstoreUrl, setPlaystoreUrl] = useState("");
    const [appstoreUrl, setAppstoreUrl] = useState("");

    const [retrospections, setRetrospections] = useState<RetrospectionInput[]>([
        { memberId: 0, content: "" }
    ]);

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);

    const { data: projectDetailData } = useQuery({
        queryKey: ["projectDetail", projectId],
        queryFn: () => getProjectDetail(projectId),
        enabled: isEditMode
    });

    const { data: retrospectionData } = useQuery({
        queryKey: ["retrospections", projectId],
        queryFn: () => getRetrospections(projectId),
        enabled: isEditMode
    });

    useEffect(() => {
        if (!projectDetailData) return;

        setSelectedGen(String(projectDetailData.generation ?? ""));
        setSelectedCategory(categoryLabelMap[projectDetailData.category] ?? "");
        setName(projectDetailData.name ?? "");
        setIntro(projectDetailData.intro ?? "");
        setDescription(projectDetailData.description ?? "");
        setTags(projectDetailData.tags ?? []);
        setWebsiteUrl(projectDetailData.websiteUrl ?? "");
        setPlaystoreUrl(projectDetailData.playstoreUrl ?? "");
        setAppstoreUrl(projectDetailData.appstoreUrl ?? "");
        setExistingImageUrls(projectDetailData.imageUrls ?? []);
    }, [projectDetailData]);

    useEffect(() => {
        if (!retrospectionData) return;

        const nextRetrospections =
            retrospectionData.length > 0
                ? retrospectionData.map((retrospection) => ({
                      id: retrospection.id,
                      memberId: retrospection.writer.id,
                      memberName: retrospection.writer.name,
                      content: retrospection.content
                  }))
                : [{ memberId: 0, content: "" }];

        setRetrospections(nextRetrospections);
    }, [retrospectionData]);

    const createProjectMutation = useMutation({
        mutationFn: async (payload: {
            name: string;
            intro: string;
            description: string;
            category: string;
            generation: number;
            tags: string[];
            websiteUrl?: string;
            playstoreUrl?: string;
            appstoreUrl?: string;
            imageStoredFileNames: string[];
            retrospections: RetrospectionInput[];
        }) => {
            const { retrospections, ...projectPayload } = payload;
            const createdProject = await createProject(projectPayload);
            const responseData = createdProject?.data;
            const projectIdFromMessage = createdProject?.message?.match(/projectId=(\d+)/)?.[1];
            const projectId =
                responseData?.id ??
                responseData?.projectId ??
                (typeof responseData === "number" || typeof responseData === "string"
                    ? responseData
                    : undefined) ??
                createdProject?.id ??
                createdProject?.projectId ??
                projectIdFromMessage;

            if (!projectId) {
                throw new Error("프로젝트 ID를 확인할 수 없습니다.");
            }

            await Promise.all(
                retrospections.map((retrospection) =>
                    createRetrospection(Number(projectId), retrospection.content)
                )
            );

            return createdProject;
        },
        onSuccess: () => {
            alert("프로젝트가 성공적으로 업로드되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["allProjects"] });
            queryClient.invalidateQueries({ queryKey: ["retrospections"] });
            navigate("/project");
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data?.message || error.message);
            } else {
                console.error(error);
            }
            alert("업로드 중 오류가 발생했습니다.");
        }
    });

    const updateProjectMutation = useMutation({
        mutationFn: async (payload: {
            name: string;
            intro: string;
            description: string;
            category: string;
            generation: number;
            tags: string[];
            websiteUrl?: string;
            playstoreUrl?: string;
            appstoreUrl?: string;
            imageStoredFileNames: string[];
            retrospections: RetrospectionInput[];
        }) => {
            const { retrospections, ...projectPayload } = payload;
            const updatedProject = await updateProject(projectId, projectPayload);

            await syncRetrospections(projectId, retrospectionData ?? [], retrospections);

            return updatedProject;
        },
        onSuccess: () => {
            alert("프로젝트가 성공적으로 수정되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["allProjects"] });
            queryClient.invalidateQueries({ queryKey: ["projectDetail", projectId] });
            queryClient.invalidateQueries({ queryKey: ["retrospections", projectId] });
            navigate(`/project/${projectId}`);
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data?.message || error.message);
            } else {
                console.error(error);
            }
            alert("수정 중 오류가 발생했습니다.");
        }
    });

    const handleLeave = () => {
        const confirmLeave = confirm("선택한 내용이 저장되지 않습니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            const target = "/mypage";
            navigate(target);
        }
    };

    const handleSubmit = async () => {
        if (!name || !intro || !description || !selectedGen || !selectedCategory) {
            alert("모든 필수 항목을 작성해주세요.");
            return;
        }

        const validRetrospections = retrospections.filter((r) => r.content.trim() !== "");

        if (validRetrospections.length === 0) {
            alert("회고를 작성해주세요.");
            return;
        }

        try {
            //  이미지 presigned 업로드
            let storedNames: string[] = [];

            if (imageFiles.length > 0) {
                const result = await uploadImages(imageFiles, "PROJECT", "IMAGE");
                storedNames = result.storedNames;
            }

            // JSON payload 생성
            const existingStoredNames = existingImageUrls.map(extractKeyFromUrl);
            const payload = {
                name,
                intro,
                description,
                category: categoryMap[selectedCategory],
                generation: Number(selectedGen),
                tags,
                websiteUrl,
                playstoreUrl,
                appstoreUrl,
                retrospections: validRetrospections,
                imageStoredFileNames: isEditMode
                    ? [...existingStoredNames, ...storedNames]
                    : storedNames
            };

            if (isEditMode) {
                updateProjectMutation.mutate({
                    name: payload.name,
                    intro: payload.intro,
                    description: payload.description,
                    category: payload.category,
                    generation: payload.generation,
                    tags: payload.tags,
                    websiteUrl: payload.websiteUrl,
                    playstoreUrl: payload.playstoreUrl,
                    appstoreUrl: payload.appstoreUrl,
                    imageStoredFileNames: payload.imageStoredFileNames,
                    retrospections: payload.retrospections
                });
            } else {
                createProjectMutation.mutate(payload);
            }
        } catch (e) {
            console.error(e);
            alert("이미지 업로드 실패");
        }
    };

    return (
        <div className="w-full flex flex-col">
            {/* //헤더.. */}
            <div className="w-full h-24 bg-black flex justify-between items-center px-[110px] relative">
                {/* ← 나가기 버튼 */}
                <button
                    onClick={handleLeave}
                    className="bg-[#2D2D2D] text-[#A7A7A7] font-bold px-4 py-2 rounded-full"
                >
                    ← 나가기
                </button>

                <div className="absolute bottom-0 left-0 w-full h-[0.6px] bg-gradient-to-r from-transparent via-white to-transparent opacity-100 pointer-events-none" />

                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#F70] text-white font-bold px-4 py-2 rounded-[120px]"
                    >
                        {isEditMode ? "수정완료" : "업로드"}
                    </button>
                </div>
            </div>

            {/* 메인 영역 */}
            <div
                className="text-[#C4C4C4] px-[116px] pt-[72px] text-[32px] font-bold pb-[395px]"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <h4 className="mb-[40px]">프로젝트</h4>

                <div
                    style={{
                        border: "1px solid #3A3A3A",
                        background: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), 
                linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),  #232323`,
                        borderRadius: "12px",
                        color: "#FFF",
                        fontSize: "20px",
                        display: "flex",
                        flexDirection: "column"
                    }}
                    className="pt-10 pl-10 pr-[34px] pb-10 min-w-[850px]"
                >
                    {/* 박스 안 */}
                    <div className="text-[14px]  flex flex-col gap-[32px] pr-[331px] font-normal">
                        {/* 기수. 구분 */}
                        <div className="flex gap-4 ml-[126px]">
                            {/* 기수  */}
                            <DropDwon
                                label="기수"
                                options={generationOptions}
                                selected={selectedGen}
                                setSelected={setSelectedGen}
                            />

                            {/* 구분  */}
                            <DropDwon
                                label="구분"
                                options={["아이디어톤", "중앙해커톤", "데모데이", "장기 프로젝트"]}
                                selected={selectedCategory}
                                setSelected={setSelectedCategory}
                            />
                        </div>
                        {/* 제목 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3 ">
                                제목
                                <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                            </label>

                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="제목"
                                className="py-3 px-4 flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        {/* 활동소개 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">
                                활동소개
                                <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                            </label>
                            <input
                                value={intro}
                                onChange={(e) => setIntro(e.target.value)}
                                placeholder="활동소개"
                                className="py-3 px-4 flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        {/* 프로젝트 설명 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">
                                프로젝트 설명
                                <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="프로젝트 설명"
                                className="py-3 px-4  h-[140px] flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        {/* 기술 스택 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">
                                기술 스택
                                <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                            </label>
                            <StackInput value={tags} onChange={setTags} color="white-gray" />
                        </div>
                        {/* 프로젝트 회고 */}
                        <div className="flex ">
                            <label className="w-[126px] flex align-center mt-3">
                                프로젝트 회고
                                <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                            </label>
                            <div className="flex flex-1 flex-col gap-3">
                                <NewRetrospectionsInput
                                    value={retrospections}
                                    onChange={setRetrospections}
                                />
                            </div>
                        </div>
                        {/* 링크 */}
                        <div className="flex ">
                            <label className="w-[126px] flex align-center mt-3">링크 삽입</label>
                            <div className="flex flex-col flex-1 gap-3">
                                <div className="flex-1 flex gap-2">
                                    <div className="py-3 w-[118px] px-4 bg-white text-black border border-[#C4C4C4] rounded-[4px]">
                                        Link
                                    </div>
                                    <input
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                        placeholder="https://"
                                        className="py-3 px-4 flex flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                                    />
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <div className="py-3 w-[118px] px-4 bg-white text-black border border-[#C4C4C4] rounded-[4px]">
                                        IOS
                                    </div>
                                    <input
                                        value={appstoreUrl}
                                        onChange={(e) => setAppstoreUrl(e.target.value)}
                                        placeholder="https://"
                                        className="py-3 px-4 flex flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                                    />
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <div className="py-3 w-[118px] px-4 bg-white text-black border border-[#C4C4C4] rounded-[4px]">
                                        Android
                                    </div>
                                    <input
                                        value={playstoreUrl}
                                        onChange={(e) => setPlaystoreUrl(e.target.value)}
                                        placeholder="https://"
                                        className="py-3 px-4 flex flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* img */}
                        <div className="flex">
                            <label className="w-[126px] flex flex-col align-center mt-3">
                                <div className="flex my-0 py-0">
                                    이미지 첨부
                                    <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                                </div>
                                (순서대로)
                                <br />
                                <span className="text-xs text-[#999] mt-2 ml-1">
                                    {existingImageUrls.length + imageFiles.length}/50
                                </span>
                            </label>
                            <NewImageDrop
                                imageFiles={imageFiles}
                                existingImageUrls={isEditMode ? existingImageUrls : []}
                                onExistingImagesChange={setExistingImageUrls}
                                onChange={(files: File[]) => {
                                    setImageFiles(files);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
