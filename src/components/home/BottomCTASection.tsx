import welcomeImg from "../../assets/home/WELCOME.svg";
export const BottomCTASection = () => {
    return (
        <div className="flex flex-col pt-[244px] w-full h-auto  bg-[#1b1b1b]">
            <div
                className=" relative w-full h-[480px] flex flex-col justify-center items-center"
                style={{ background: "linear-gradient(98.85deg, #FF5900 1.18%, #FFC859 98.14%)" }}
            >
                <img src={welcomeImg} alt="welcome" className="w-full ㅗ absolute bottom-0" />
                <h1 className="w-[772px]  text-[#1B1B1B] text-center text-[64px] font-extrabold leading-[130%] mb-[40px]">
                    지금 바로
                    <br />
                    멋사 무리에 합류하세요!
                </h1>
                <button className="z-10 bg-[#1B1B1B] mx-auto text-[#ECECEC] w-[269px] h-[76px]  rounded-[300px] text-[24px]	font-bold cursor-pointer">
                    14기 모집 알람 받기
                </button>
            </div>
            <div className="h-[97px] px-[111px] justify-between flex items-center text-[#666666] text-[14px]">
                <span>
                    Copyright © 2025 멋쟁이사자처럼 서울과학기술대학교 Inc. All rights reserved.
                </span>
                <span>Instagram</span>
            </div>
        </div>
    );
};
