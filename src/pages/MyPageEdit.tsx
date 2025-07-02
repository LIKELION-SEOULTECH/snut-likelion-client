import { PortfolioLinksInput } from "@/components/MyPage/PortfolioLinksInput";
import { StackInput } from "@/components/MyPage/StackInput";
import { useLocation, useNavigate } from "react-router-dom";
import type {
    LionInfoDetailsResponse,
    MemberDetailResponse,
    SimplePortfolioLink
} from "@/types/member";
import { useState } from "react";
import { ImageCropper } from "@/components/MyPage/ImageCropper";
import axiosInstance from "@/apis/axiosInstance";

export const MyPageEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as {
        member: MemberDetailResponse;
        lionInfo: LionInfoDetailsResponse;
        selectedGeneration: number;
    };

    const { member, lionInfo, selectedGeneration } = state;

    const [profileImage, setProfileImage] = useState<string>(member.profileImageUrl);
    const [rawImage, setRawImage] = useState<string | null>(null);
    const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);

    const [stackList, setStackList] = useState(member.stacks || []);
    const [portfolioLinks, setPortfolioLinks] = useState<SimplePortfolioLink[]>(
        member.portfolioLinks && member.portfolioLinks.length > 0
            ? member.portfolioLinks.map(({ name, url }) => ({ name, url }))
            : [{ name: "", url: "" }]
    );

    const [intro, setIntro] = useState(member.intro || "");
    const [description, setDescription] = useState(member.description || "");
    const [quote, setQuote] = useState(member.saying || "");
    const [email, setEmail] = useState(member.email || "");

    const handleLeave = () => {
        const confirmLeave = confirm("선택한 내용이 저장되지 않습니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            navigate("/mypage");
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // 이미지

        if (croppedImageFile) {
            formData.append("profileImage", croppedImageFile);
        }

        formData.append("intro", intro);
        formData.append("description", description);
        formData.append("saying", quote);
        formData.append("email", email);

        // formData.append("major", member.major || "");

        stackList.forEach((stack) => formData.append("stacks", stack));

        portfolioLinks.forEach((link, index) => {
            formData.append(`portfolioLinks[${index}].name`, link.name);
            formData.append(`portfolioLinks[${index}].url`, link.url);
        });
        try {
            const response = await axiosInstance.patch(`/members/${member.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("PATCH 응답:", response);
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
            alert("수정되었습니다!");
            navigate("/mypage");
        } catch (error) {
            console.error("업데이트 실패", error);
            alert("수정 중 오류가 발생했습니다.");
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
                        수정완료
                    </button>
                </div>
            </div>
            {/* 아래 */}
            <div
                className="text-white px-[116px] pt-[72px] text-[32px] font-bold pb-[395px]"
                style={{
                    background: "linear-gradient(180deg, #000000 0%, #1B1B1B 29.27%)"
                }}
            >
                <h4 className="mb-[40px]">마이페이지 수정</h4>
                <div
                    style={{
                        border: "1px solid #3A3A3A",
                        background: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), 
                linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),  #232323`,
                        borderRadius: "12px",
                        color: "#FFF",
                        fontSize: "20px",
                        display: "flex"
                    }}
                    className="pt-10 pl-11 pr-[34px] pb-15"
                >
                    {/* 왼쪽 영역 - 사진 */}
                    <div className="w-[215px] mr-[112px] flex  flex-col overflow-hidden">
                        {rawImage && (
                            <ImageCropper
                                image={rawImage}
                                onCompleteCrop={(base64) => {
                                    setProfileImage(base64); // UI에 보여줄 이미지
                                    setRawImage(null);

                                    // base64 → File 변환
                                    const base64Data = base64.split(",")[1];
                                    const byteString = atob(base64Data);
                                    const byteNumbers = new Array(byteString.length);
                                    for (let i = 0; i < byteString.length; i++) {
                                        byteNumbers[i] = byteString.charCodeAt(i);
                                    }
                                    const byteArray = new Uint8Array(byteNumbers);
                                    const file = new File([byteArray], "profile.png", {
                                        type: "image/png"
                                    });

                                    setCroppedImageFile(file); // 저장
                                }}
                                onCancel={() => setRawImage(null)}
                            />
                        )}
                        {!rawImage && (
                            <img
                                src={profileImage}
                                alt="profile"
                                className="w-[215px] h-[207px] object-contain"
                            />
                        )}
                        <input
                            className="hidden"
                            type="file"
                            accept="image/png"
                            id="profile-upload"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const maxSize = 50 * 1024 * 1024;
                                    if (file.type !== "image/png") {
                                        alert("PNG 파일만 업로드 가능합니다!");
                                        return;
                                    }
                                    if (file.size > maxSize) {
                                        alert("이미지 용량은 50MB 이하로 업로드해주세요.");
                                        return;
                                    }

                                    const imageUrl = URL.createObjectURL(file);
                                    setRawImage(imageUrl); // 자르기용
                                }
                            }}
                        />
                        <label
                            htmlFor="profile-upload"
                            className="mt-5 bg-[#7F7F7F] text-[13px] rounded-[4px] py-[14px] w-full font-normal text-center cursor-pointer"
                        >
                            사진 수정하기
                        </label>

                        <span className="text-[12px] mt-4 text-center text-[#666] font-normal">
                            1:1 사이즈, png, 이미지 용량 50mb 이하
                        </span>
                    </div>
                    {/* 오른쪽 영역 - 입력폼*/}
                    <div className="flex-1 flex flex-col text-[#C4C4C4] text-[14px] gap-[32px]">
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">기수</label>
                            <input
                                value={`${selectedGeneration}기`}
                                readOnly
                                className="py-3 px-4 flex-1 bg-whiterounded-[4px] text-[#C4C4C4] border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">파트</label>
                            <input
                                value={lionInfo.part}
                                readOnly
                                className="py-3 px-4 flex-1 bg-white rounded-[4px] text-[#C4C4C4] border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">이름</label>
                            <input
                                value={member.name}
                                readOnly
                                className="py-3 px-4 flex-1 bg-white rounded-[4px] text-[#C4C4C4] border-1 border-[#C4C4C4]"
                            />
                        </div>
                        {/* <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">학과</label>
                            <input
                                value={member.major}
                                readOnly
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div> */}
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">
                                한줄 소개
                                <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                            </label>
                            <input
                                onChange={(e) => setIntro(e.target.value)}
                                value={intro}
                                placeholder="한줄 소개"
                                className="py-3 px-4 flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">
                                소개
                                <span className="w-[4px] h-[4px] ml-[3px] rounded-full bg-[#FF7700]" />
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="소개"
                                className="py-3 px-4 h-[140px] flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">기술 스택</label>
                            <StackInput
                                value={stackList}
                                onChange={setStackList}
                                color="dark-gray"
                            />
                        </div>
                        <div className="flex ">
                            <label className="w-[126px] flex align-center mt-3">
                                포트폴리오 링크
                            </label>
                            <div className="flex flex-1 flex-col gap-3">
                                <PortfolioLinksInput
                                    value={portfolioLinks}
                                    onChange={setPortfolioLinks}
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">명언</label>
                            <input
                                value={quote}
                                onChange={(e) => setQuote(e.target.value)}
                                placeholder="명언"
                                className="py-3 px-4 flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">메일</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="메일"
                                className="py-3 px-4 flex-1 bg-white rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
