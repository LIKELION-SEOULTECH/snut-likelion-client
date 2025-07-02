import { Link, useNavigate, useLocation } from "react-router-dom";

interface PostNavigatorProps {
    prev?: { title: string; href: string };
    next?: { title: string; href: string };
}

export const PostNavigator = ({ prev, next }: PostNavigatorProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoToList = () => {
        if (location.pathname.includes("blog-content")) {
            navigate("/blog");
        }
    };

    return (
        <div className="w-full text-xl text-[#404040]">
            <div className="border-t-[2px] border-[#7F7F7F]" />
            {prev && (
                <Link
                    to={prev.href}
                    className="flex items-center justify-start py-5 border-b border-[#7F7F7F]"
                >
                    <span className="min-w-[81px]">이전글</span>
                    <span className="truncate hover:underline">{prev.title}</span>
                </Link>
            )}
            {next && (
                <Link
                    to={next.href}
                    className="flex items-center justify-start py-5 border-b-[2px] border-[#7F7F7F]"
                >
                    <span className="min-w-[81px]">다음글</span>
                    <span className="truncate hover:underline">{next.title}</span>
                </Link>
            )}
            <div className="w-full flex justify-end">
                <button
                    className="px-4 py-[10px] bg-[#A7A7A7] text-white text-base rounded-full mt-[55px] cursor-pointer"
                    onClick={handleGoToList}
                >
                    목록 →
                </button>
            </div>
        </div>
    );
};
