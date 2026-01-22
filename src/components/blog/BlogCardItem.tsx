import { useNavigate } from "react-router-dom";
import sample from "@/assets/common/sampleBox.png";
interface BlogCardProps {
    id: number;
    imageUrl: string;
    title: string;
    date: string;
}

export const BlogCardItem = ({ id, imageUrl, title, date }: BlogCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog-content/${id}`);
    };

    const formattedDate = new Date(date).toISOString().split("T")[0].replace(/-/g, ".");

    return (
        <div
            className="relative rounded-[15px] overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-102"
            onClick={handleClick}
        >
            <img src={imageUrl || sample} alt={title} className="w-full h-[286px] object-cover" />
            <div className="absolute flex flex-col gap-4 w-full h-full top-0 left-0 bg-transparent bg-opacity-40 text-white p-6">
                <div className="w-62 font-medium text-2xl leading-[150%]">{title}</div>
                <div className="flex text-xl h-5 text-[#C4C4C4] font-light items-center">
                    {formattedDate}
                </div>
            </div>
        </div>
    );
};
