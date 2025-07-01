import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyPageTab = ({ isGuest = false }: { isGuest?: boolean }) => {
    const [activeTab, setActiveTab] = useState<string | null>(isGuest ? "계정설정" : null);
    const [isAccountOpen, setIsAccountOpen] = useState(isGuest);
    const navigate = useNavigate();

    const toggleTab = (tab: string) => {
        if (tab === "계정설정") {
            setIsAccountOpen((prev) => !prev);
        } else {
            setIsAccountOpen(isGuest);
        }

        setActiveTab(tab);

        if (tab === "프로필 수정") navigate("/mypage-edit");
        if (tab === "비밀번호 변경") navigate("/PasswordChange");
    };

    const isActive = (tab: string) => activeTab === tab;

    const isAnyAccountTabActive = ["계정설정", "비밀번호 변경", "로그아웃", "회원탈퇴"].includes(
        activeTab ?? ""
    );

    const baseBtnClass = "w-full py-3 px-4 rounded text-left rounded-[8px] cursor-pointer";

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
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}
        >
            {!isGuest && (
                <button
                    onClick={() => toggleTab("프로필 수정")}
                    className={`${baseBtnClass} ${isActive("프로필 수정") ? "bg-[#404040]" : ""}`}
                >
                    프로필 수정
                </button>
            )}

            <button
                onClick={() => toggleTab("계정설정")}
                className={`${baseBtnClass} ${isAnyAccountTabActive ? "bg-[#404040]" : ""}`}
            >
                계정설정
            </button>

            {(isGuest || isAccountOpen) && (
                <>
                    <button
                        onClick={() => toggleTab("비밀번호 변경")}
                        className={`${baseBtnClass} `}
                    >
                        비밀번호 변경
                    </button>
                    <button onClick={() => toggleTab("로그아웃")} className={`${baseBtnClass} `}>
                        로그아웃
                    </button>
                    <button onClick={() => toggleTab("회원탈퇴")} className={`${baseBtnClass} `}>
                        회원탈퇴
                    </button>
                </>
            )}
        </div>
    );
};
