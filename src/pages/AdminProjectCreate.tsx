import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ImageUpload } from "@/components/admin/project/ImageUpload";
import { searchMembers } from "@/apis/member";
import type { Member } from "@/types/member";
import { createProject } from "@/apis/project";
import { useNavigate } from "react-router-dom";
interface Retro {
    memberId: number | null;
    memberName: string; // UI에 보여줄 이름
    comment: string;
    query: string;
    filtered: { id: number; name: string }[];
    showDropdown: boolean;
}

export const AdminProjectCreatePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const [generation, setGeneration] = useState("");
    const [type, setType] = useState("");

    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const [projectDescription, setProjectDescription] = useState("");
    const [webUrl, setWebUrl] = useState("");
    const [iosUrl, setIosUrl] = useState("");
    const [androidUrl, setAndroidUrl] = useState("");

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

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setTagInput(input);

        // 띄어쓰기 기준으로 분리
        const splitTags = input
            .split(" ")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        setTags(splitTags);
    };

    const isFormValid =
        generation.trim() !== "" &&
        type.trim() !== "" &&
        name.trim() !== "" &&
        intro.trim() !== "" &&
        projectDescription.trim() !== "" &&
        retros.every((r) => r.memberId !== null && r.comment.trim() !== "") &&
        images.length > 0;

    // 멤버 검색
    const handleMemberInputChange = async (index: number, value: string) => {
        try {
            if (value.trim()) {
                const res = await searchMembers(value);
                const filtered = res.data.data.map((member: Member) => ({
                    id: member.id,
                    name: member.name
                }));

                setRetros((prev) =>
                    prev.map((r, i) =>
                        i === index
                            ? {
                                  ...r,
                                  query: value,
                                  filtered,
                                  showDropdown: filtered.length > 0
                              }
                            : r
                    )
                );
            }
        } catch (err) {
            console.error("멤버 검색 실패", err);
        }
    };

    const handleCreateProject = async () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("intro", intro);
        formData.append("description", projectDescription);
        formData.append("generation", String(Number(generation))); // 반드시 문자열로 변환
        formData.append("category", type);

        // optional한 URL들은 비어있지 않을 때만 추가
        if (webUrl) formData.append("websiteUrl", webUrl);
        if (iosUrl) formData.append("appstoreUrl", iosUrl);
        if (androidUrl) formData.append("playstoreUrl", androidUrl);

        // tags: 각 항목별로 append
        tags.forEach((tag) => formData.append("tags", tag));

        // retrospections: 구조 분해해서 append
        retros.forEach((retro, index) => {
            if (retro.memberId !== null) {
                formData.append(`retrospections[${index}].memberId`, String(retro.memberId));
                formData.append(`retrospections[${index}].content`, retro.comment);
            }
        });

        // 이미지 첨부
        images.forEach((img) => {
            formData.append("images", img);
        });

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            await createProject(formData);
            console.log("성공");

            navigate("/admin/project");
        } catch (err) {
            console.error(err);
            alert("프로젝트 생성 실패");
        }
    };

    return (
        <AdminLayout isFormValid={isFormValid} onSubmit={handleCreateProject}>
            <div className="w-full flex flex-col bg-white mt-11 rounded-sm mb-12 pt-[22px] px-10 pb-10 gap-8">
                <div className="flex flex-row items-center h-11 pl-[169px] gap-2">
                    <Select value={generation} onValueChange={setGeneration}>
                        <SelectTrigger className="w-[86px] !h-full bg-white rounded-sm px-4 py-3 border-[#C4C4C4] data-[placeholder]:text-black">
                            <SelectValue placeholder="기수" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm w-[86px] border-[#C4C4C4] min-w-0">
                            <SelectItem value="13" className="w-[86px] px-4 py-3">
                                13기
                            </SelectItem>
                            <SelectItem value="12" className="w-[86px] px-4 py-3">
                                12기
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-[162px] !h-full bg-white rounded-sm px-4 py-3 border-[#C4C4C4] data-[placeholder]:text-black">
                            <SelectValue placeholder="구분" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm w-[162px] border-[#C4C4C4] min-w-0">
                            <SelectItem value="IDEATHON" className="w-[162px] px-4 py-3">
                                아이디어톤
                            </SelectItem>
                            <SelectItem value="HACKATHON" className="w-[162px] px-4 py-3">
                                해커톤
                            </SelectItem>
                            <SelectItem value="DEMO_DAY" className="w-[162px] px-4 py-3">
                                데모데이
                            </SelectItem>
                            <SelectItem value="LONG_TERM_PROJECT" className="w-[162px] px-4 py-3">
                                장기프로젝트
                            </SelectItem>
                        </SelectContent>
                    </Select>
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
                        <input
                            className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm"
                            value={tagInput}
                            onChange={handleTagInputChange}
                        />
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
                            <div className="flex flex-row gap-2" key={index}>
                                <div className="relative w-[89px]">
                                    <input
                                        className="w-full h-11 px-4 border border-[#C4C4C4] text-sm rounded-sm"
                                        placeholder="멤버 검색"
                                        value={retro.query}
                                        onChange={(e) =>
                                            handleMemberInputChange(index, e.target.value)
                                        }
                                        onFocus={() => {
                                            if (retro.query)
                                                handleChangeRetro(index, "showDropdown", true);
                                        }}
                                    />
                                    {retro.showDropdown && retro.filtered.length > 0 && (
                                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-sm shadow mt-1 max-h-40 overflow-auto">
                                            {retro.filtered.map((member, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => handleSelect(index, member)}
                                                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {member.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="flex flex-1 relative">
                                    <input
                                        maxLength={50}
                                        className="w-full h-11 px-4 border border-[#C4C4C4] text-sm rounded-sm"
                                        placeholder="회고"
                                        value={retro.comment}
                                        onChange={(e) =>
                                            handleChangeRetro(index, "comment", e.target.value)
                                        }
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#999999]">
                                        {retro.comment.replace(/\s/g, "").length}/50
                                    </span>
                                </div>
                            </div>
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
        </AdminLayout>
    );
};
