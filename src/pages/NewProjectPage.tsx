import { StackInput } from "@/components/MyPage/StackInput";
import { NewImageDrop } from "@/components/project/NewImageDrop";
import { NewRetrospectionsInput } from "@/components/project/NewRetrospectionsInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const NewProjectPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<string[]>([]);

    const handleLeave = () => {
        const confirmLeave = confirm("선택한 내용이 저장되지 않습니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            const target = "/mypage";
            navigate(target);
        }
    };

    const handleSubmit = () => {
        alert("수정 되었습니다 !");
        //****채워야한다.......****//
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
                        <div className="flex gap-2 pl-[205px]">
                            <select className="py-3 px-4 w-[86px] bg-white text-[#47484B] font-normal border border-[#C4C4C4] rounded-[4px] ">
                                <option value="">기수</option>
                                <option>13기</option>
                                <option>12기</option>
                            </select>
                            <select className="py-3 px-4 w-[162px] bg-white text-[#47484B] font-normal border border-[#C4C4C4] rounded-[4px] ">
                                <option value="">구분</option>
                                <option>아이디어톤</option>
                                <option>중앙해커톤</option>
                                <option>데모데이</option>
                            </select>
                        </div>
                        {/* 제목 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3 ">제목</label>
                            <input
                                placeholder="제목"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        {/* 활동소개 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">활동소개</label>
                            <input
                                placeholder="활동소개"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        {/* 프로젝트 설명 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">
                                프로젝트 설명
                            </label>
                            <textarea
                                placeholder="프로젝트 설명"
                                className="py-3 px-4  h-[140px] flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        {/* 기술 스택 */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">기술 스택</label>
                            <StackInput color="white-gray" />
                        </div>
                        {/* 프로젝트 회고 */}
                        <div className="flex ">
                            <label className="w-[126px] flex align-center mt-3">
                                프로젝트 회고
                            </label>
                            <div className="flex flex-1 flex-col gap-3">
                                <NewRetrospectionsInput />
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
                                        placeholder="https://"
                                        className="py-3 px-4 flex flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                                    />
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <div className="py-3 w-[118px] px-4 bg-white text-black border border-[#C4C4C4] rounded-[4px]">
                                        Ios
                                    </div>
                                    <input
                                        placeholder="https://"
                                        className="py-3 px-4 flex flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                                    />
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <div className="py-3 w-[118px] px-4 bg-white text-black border border-[#C4C4C4] rounded-[4px]">
                                        Android
                                    </div>
                                    <input
                                        placeholder="https://"
                                        className="py-3 px-4 flex flex-1 bg-white text-black border border-[#C4C4C4] rounded-[4px]"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* img */}
                        <div className="flex">
                            <label className="w-[126px] flex flex-col align-center mt-3">
                                이미지 첨부 <br />
                                (순서대로)
                                <br />
                                <span className="text-xs text-[#999] mt-2 ml-1">
                                    {images.length}/50
                                </span>
                            </label>
                            <NewImageDrop images={images} setImages={setImages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
