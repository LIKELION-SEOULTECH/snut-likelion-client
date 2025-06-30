import { PortfolioLinksInput } from "@/components/MyPage/PortfolioLinksInput";
import { StackInput } from "@/components/MyPage/StackInput";
import { useNavigate } from "react-router-dom";

export const MyPageEdit = () => {
    const navigate = useNavigate();

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
                        <img
                            className="w-[215px] h-[207px] object-contain "
                            style={{
                                border: "1px solid #3A3A3A",
                                background: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), 
                linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),  #232323`
                            }}
                        />
                        <button className="mt-5 bg-[#7F7F7F] text-[13px] rounded rounded-[4px] py-[14px] w-full font-normal">
                            사진 수정하기
                        </button>
                        <span className="text-[12px] mt-4 text-center text-[#666] font-normal">
                            1:1 사이즈, png, 이미지 용량 50mb 이하
                        </span>
                    </div>
                    {/* 오른쪽 영역 - 입력폼*/}
                    <div className="flex-1 flex flex-col text-[#C4C4C4] text-[14px] gap-[32px]">
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">기수</label>
                            <input
                                placeholder="기수"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">파트</label>
                            <input
                                placeholder="파트"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">이름</label>
                            <input
                                placeholder="이름"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">학과</label>
                            <input
                                placeholder="학과"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">한줄 소개</label>
                            <input
                                placeholder="한줄 소개"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">소개</label>
                            <textarea
                                placeholder="소개"
                                className="py-3 px-4 h-[140px] flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">기술 스택</label>
                            <StackInput color="dark-gray" />
                        </div>
                        <div className="flex ">
                            <label className="w-[126px] flex align-center mt-3">
                                포트폴리오 링크
                            </label>
                            <div className="flex flex-1 flex-col gap-3">
                                <PortfolioLinksInput />
                            </div>
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">명언</label>
                            <input
                                placeholder="명언"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                        <div className="flex">
                            <label className="w-[126px] flex align-center mt-3">메일</label>
                            <input
                                placeholder="메일"
                                className="py-3 px-4 flex-1 bg-white rounded rounded-[4px] text-black border-1 border-[#C4C4C4]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
