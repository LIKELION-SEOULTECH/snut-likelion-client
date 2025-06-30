import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Notice } from "@/types/notice";
import EllipsisVertical from "@/assets/admin/ellipsis-vertical.svg?react";

interface NoticeItemProps {
    notice: Notice;
    index: number;
    showCheckboxes: boolean;
    selected: boolean;
    onToggleSelect: (id: number) => void;
}

export const NoticeSearchItem = ({
    notice,
    index,
    showCheckboxes,
    selected,
    onToggleSelect
}: NoticeItemProps) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [isFixed, setIsFixed] = useState(notice.pinned);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/admin/notice/${notice.noticeId}`);
    };

    const togglePopup = () => setOpenPopup((prev) => !prev);
    const handleFixClick = () => {
        setIsFixed((prev) => !prev);
        setOpenPopup(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setOpenPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`relative flex h-[66px] items-center font-medium ${
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            }`}
        >
            {showCheckboxes && (
                <span className="flex items-center justify-center flex-[0.3] text-center pl-4">
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
            )}
            <span className="flex-[0.7] pl-[30px] text-left">{notice.noticeId}</span>
            <span className="flex-[0.7] text-left">공지</span>
            {/* <span className="flex-[0.7] text-left">{notice.tag}</span> */}
            <span className="flex-[4] text-left cursor-pointer" onClick={handleNavigate}>
                <div className="flex justify-between items-center pr-14">
                    <span>{notice.title}</span>
                    {isFixed && <span className="text-[#FF7700]">고정</span>}
                </div>
            </span>
            {/* <span className="flex-[1] text-left">{notice.writer}</span> */}
            <span className="flex-[1] text-left">김혜준</span>
            <span className="flex-[1.5] text-left">
                {new Date(notice.createdAt).toISOString().slice(0, 10)}
            </span>
            <button className="absolute right-6 cursor-pointer" onClick={togglePopup}>
                <EllipsisVertical />
            </button>
            {openPopup && (
                <div
                    ref={popupRef}
                    className="absolute right-1 top-[45px] flex items-center justify-center w-21 h-9 text-sm border border-[#ECECEC] z-10 rounded-sm bg-white shadow cursor-pointer"
                    onClick={handleFixClick}
                >
                    상단 고정
                </div>
            )}
        </div>
    );
};
