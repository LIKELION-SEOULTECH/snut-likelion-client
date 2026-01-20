import { useNavigate } from "react-router-dom";
import type { Notice } from "@/types/notice";

interface NoticeItemProps {
    notice: Notice;
    index: number;
    selected: boolean;
    onToggleSelect: (id: number) => void;
}

export const NoticeSearchItem = ({ notice, index, selected, onToggleSelect }: NoticeItemProps) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/admin/notice/${notice.noticeId}`);
    };

    return (
        <div
            className={`relative flex h-[66px] items-center font-medium px-5 ${
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            }`}
        >
            <span className="flex items-center justify-center flex-[1] text-center">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelect(notice.noticeId)}
                    className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                        checked:bg-[#FF7700] checked:border-transparent 
                        checked:after:content-['✓'] checked:after:text-white 
                        checked:after:text-[16px] checked:after:block 
                        checked:after:text-center checked:after:leading-[1rem] 
                        flex items-center justify-center align-middle"
                />
            </span>

            <span className="flex-[3.5] text-left pl-9 min-w-5">{notice.noticeId}</span>
            <span className="flex-[21.5] text-left cursor-pointer" onClick={handleNavigate}>
                <div className="flex justify-between items-center">
                    <span>{notice.title}</span>
                </div>
            </span>
            <span className="flex-[2.7] text-left min-w-20">
                {new Date(notice.updatedAt).toISOString().slice(0, 10)}
            </span>
        </div>
    );
};
