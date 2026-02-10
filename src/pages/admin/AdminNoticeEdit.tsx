import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getNoticeById, updateNotice } from "@/apis/main/notice";
import { ADMIN_ABS } from "@/routes/routes";
import AdminTextEditor from "@/components/text-editor/AdminTextEditor";
import { CustomSelect } from "@/components/admin/common/custom-select";
import { toast } from "sonner";
import { AlertCircle, CircleCheck } from "lucide-react";

export const AdminNoticeEditPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: notice } = useQuery({
        queryKey: ["notice", id],
        queryFn: () => getNoticeById(Number(id) || 1),
        enabled: !!id
    });

    useEffect(() => {
        if (notice) {
            setTitle(notice.title);
            setContent(notice.content);
        }
    }, [notice]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const totalSizeMB = files.reduce((acc, file) => acc + file.size / 1024 / 1024, 0).toFixed(2);

    const isFormValid = type.trim() !== "" && content.trim() !== "" && title.trim() !== "";

    const updateNoticeMutation = useMutation({
        mutationFn: (payload: { title: string; content: string }) =>
            updateNotice(Number(id), {
                ...payload,
                pinned: true
            }),

        onSuccess: () => {
            navigate("/admin/notice");
            console.log("수정성공");
            toast(
                <div className="flex items-center gap-2">
                    <CircleCheck size={20} className="text-green-400" />
                    <span className="text-sm font-medium">게시물이 삭제되었습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
            queryClient.invalidateQueries({ queryKey: ["adminNotices"] });
            queryClient.invalidateQueries({ queryKey: ["notice", id] });
        },

        onError: () => {
            toast(
                <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-sm font-medium">공지 수정에 실패했습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
        }
    });

    const handleClickDelete = () => {
        alert("삭제 로직 추가");
    };

    const handleUpdate = () => {
        updateNoticeMutation.mutate({
            title,
            content
        });
    };

    const handleBackBtn = () => {
        navigate(ADMIN_ABS.NOTICE);
    };

    return (
        <AdminLayout
            isFormValid={isFormValid}
            onSubmit={handleUpdate}
            onDelete={handleClickDelete}
            onClickBackBtn={handleBackBtn}
        >
            <div className="w-full flex flex-col bg-white mt-11 rounded-sm p-12 mb-12 pl-[33px] pr-10 py-10 gap-8">
                {/* 카테고리 입력 */}
                <div className="flex flex-row h-11 items-center">
                    <span className="min-w-[94px] medium-14 text-gray-400">카테고리</span>
                    <div className="w-[99px]">
                        <CustomSelect
                            value={type}
                            onValueChange={setType}
                            placeholder="구분"
                            selectList={[{ label: "공지", value: "NOTICE" }]}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-[18px] items-center">
                    <span className="w-19 text-sm font-medium text-[#666666]">제목</span>
                    <input
                        className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-[18px] items-start">
                    <span className="w-19 pt-[14px] text-sm font-medium text-[#666666]">내용</span>
                    <div className="flex-1">
                        <AdminTextEditor content={content} setContent={setContent} />
                    </div>
                </div>
                {/* 첨부파일 */}
                <div className="flex flex-row gap-[18px] items-start">
                    <span className="w-19 pt-2 text-sm font-medium text-[#666666]">첨부파일</span>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <button
                                className="bg-[#7F7F7F] px-3 py-2 text-white text-sm rounded-sm"
                                onClick={openFileDialog}
                            >
                                파일 첨부
                            </button>
                            <span className="text-sm text-[#A7A7A7]">
                                일반파일 현재{totalSizeMB}MB/전체10MB
                            </span>
                        </div>

                        {/* Drag 영역 */}
                        {files.length <= 0 && (
                            <div
                                className="w-full h-[120px] border border-dotted border-[#339DFF] rounded-sm 
                                flex items-center justify-center text-sm text-[#666666] bg-white"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                파일을 마우스로 끌어 오세요
                            </div>
                        )}
                        {/* 파일 리스트 */}
                        {files.length > 0 && (
                            <div className="mt-2 bg-[#FAFAFA] border border-[#D9D9D9] rounded-sm">
                                <div className="flex flew-row justify-between px-[11px] py-[6px]">
                                    <div className="flex items-center gap-11">
                                        <button
                                            className="text-lg text-[#666666]"
                                            onClick={() => setFiles([])}
                                        >
                                            ×
                                        </button>
                                        <span className="text-sm text-[#333333]">파일명</span>
                                    </div>
                                    <div className="flex items-center text-sm text-[#666666]">
                                        용량
                                    </div>
                                </div>

                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-white border-t border-[#D9D9D9] rounded-b-sm px-[11px] py-3"
                                    >
                                        <div className="flex items-center gap-11">
                                            <button
                                                className="text-lg text-[#666666]"
                                                onClick={() => handleRemoveFile(index)}
                                            >
                                                ×
                                            </button>
                                            <span className="text-sm text-[#333333]">
                                                {file.name}
                                            </span>
                                        </div>
                                        <div className="text-sm text-[#666666]">
                                            {(file.size / 1024 / 1024).toFixed(2)}MB
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
