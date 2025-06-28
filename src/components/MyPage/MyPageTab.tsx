export const MyPageTab = () => {
    return (
        <div
            style={{
                border: "1px solid #3A3A3A",
                background: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), 
        linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),  #232323`,
                borderRadius: "12px",
                padding: "33px",
                color: "#FFF",
                fontSize: "20px",
                display: "flex ",
                flexDirection: "column",
                gap: "8px"
            }}
        >
            {/* <button className="bg-[#404040] w-full py-3 px-4 px-4 rounded text-left rounded-[8px]">
                프로필 수정
            </button>
            <button className="bg-[#404040] w-full py-3 px-4 rounded text-left rounded-[8px]">
                내가 쓴 블로그 글
            </button> */}
            <button className="bg-[#404040] w-full py-3 px-4 rounded text-left rounded-[8px]">
                계정설정
            </button>
            <button className=" w-full py-3 px-4 rounded text-left rounded-[8px]">
                비밀번호 변경
            </button>
            <button className=" w-full py-3 px-4 rounded text-left rounded-[8px]">로그아웃</button>
            <button className="w-full py-3 px-4 rounded text-left rounded-[8px]">회원탈퇴</button>
        </div>
    );
};
