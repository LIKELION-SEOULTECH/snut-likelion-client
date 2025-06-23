import Logo from "@/assets/Header/likelion_logo.svg?react"; // SVG 컴포넌트로 불러올 경우

export const SidebarHeader = () => {
    return (
        <div className="flex items-center gap-[9px] h-20 px-10">
            <Logo />
            <span className="text-white text-[28px] font-medium pr-[38px]">Admin</span>
        </div>
    );
};
