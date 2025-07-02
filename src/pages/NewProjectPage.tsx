import { StackInput } from "@/components/MyPage/StackInput";
import { NewImageDrop } from "@/components/project/NewImageDrop";
import { NewRetrospectionsInput } from "@/components/project/NewRetrospectionsInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "@/apis/axiosInstance";

import axios from "axios";
import { DropDwon } from "@/components/MyPage/DropDown";

const categoryMap: Record<string, string> = {
    전체: "",
    중앙해커톤: "HACKATHON",
    아이디어톤: "IDEATHON",
    데모데이: "DEMO_DAY",
    "장기 프로젝트": "LONG_TERM_PROJECT"
};

export const NewProjectPage = () => {
    const navigate = useNavigate();

    const [selectedGen, setSelectedGen] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [description, setDescription] = useState("");

    const [tags, setTags] = useState<string[]>([]);

    const [websiteUrl, setWebsiteUrl] = useState("");
    const [playstoreUrl, setPlaystoreUrl] = useState("");
    const [appstoreUrl, setAppstoreUrl] = useState("");

    const [retrospections, setRetrospections] = useState([{ memberId: 0, content: "" }]);

    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleLeave = () => {
        const confirmLeave = confirm("선택한 내용이 저장되지 않습니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            const target = "/mypage";
            navigate(target);
        }
    };

    const handleSubmit = async () => {
        // 필수 입력 유효성 검사
        if (!name || !intro || !description || !selectedGen || !selectedCategory) {
            alert("모든 필수 항목을 작성해주세요.");
            return;
        }

        // 회고가 하나라도 있어야 하고, 그 내용도 입력되어야 함
        const validRetrospections = retrospections.filter(
            (r) => r.memberId !== 0 && r.content.trim() !== ""
        );
        if (validRetrospections.length === 0) {
            alert("회고를 작성해주세요.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("intro", intro);
            formData.append("description", description);
            formData.append("category", categoryMap[selectedCategory]);
            if (websiteUrl) formData.append("websiteUrl", websiteUrl);
            if (playstoreUrl) formData.append("playstoreUrl", playstoreUrl);
            if (appstoreUrl) formData.append("appstoreUrl", appstoreUrl);
            formData.append("generation", String(selectedGen));
            // formData.append("tags", JSON.stringify(tags));
            tags.forEach((tag) => {
                formData.append("tags", tag);
            });

            imageFiles.forEach((file) => formData.append("images", file));
            retrospections.forEach((retro, idx) => {
                formData.append(`retrospections[${idx}].memberId`, String(retro.memberId));
                formData.append(`retrospections[${idx}].content`, retro.content);
            });

            await axiosInstance.post("/projects", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("프로젝트가 성공적으로 업로드되었습니다!");
            navigate("/project");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data?.message || error.message);
            } else {
                console.error(error);
            }
            alert("업로드 중 오류가 발생했습니다.");
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
                        업로드
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
                                options={["12", "13"]}
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
                                        Ios
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
                                    {imageFiles.length}/50
                                </span>
                            </label>
                            <NewImageDrop
                                imageFiles={imageFiles}
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
