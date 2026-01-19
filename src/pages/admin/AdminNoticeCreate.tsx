import { useState, useRef } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { createNotice } from "@/apis/main/notice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ADMIN_ABS } from "@/routes/routes";
import AdminTextEditor from "@/components/text-editor/AdminTextEditor";
import { CustomSelect } from "@/components/admin/common/custom-select";

export const AdminNoticeCreatePage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const totalSizeMB = (() => {
        const size = files.reduce((acc, file) => acc + file.size / 1024 / 1024, 0);
        return size === 0 ? 0 : size.toFixed(2);
    })();

    const isFormValid = type.trim() !== "" && content.trim() !== "" && title.trim() !== "";

    // notice 생성
    const createNoticeMutation = useMutation({
        mutationFn: () =>
            createNotice({
                title,
                content
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminNotices"]
            });

            navigate(ADMIN_ABS.NOTICE);
        },
        onError: () => {
            alert("공지사항 등록에 실패했습니다.");
        }
    });

    // 업로드
    const handleUpload = () => {
        createNoticeMutation.mutate();
    };

    const handleBackBtn = () => {
        navigate(ADMIN_ABS.NOTICE);
    };

    return (
        <AdminLayout
            isFormValid={isFormValid}
            onSubmit={handleUpload}
            onClickBackBtn={handleBackBtn}
        >
            <div className="w-full flex flex-col bg-gray-0 mt-11 rounded-sm mb-12 pl-[33px] p-10 gap-8">
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

                {/* 제목 입력 */}
                <div className="flex flex-row h-11 items-center">
                    <span className="min-w-[94px] medium-14 text-gray-400">제목</span>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-0 !h-full rounded-sm pl-4 border-gray-100 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                    />
                </div>

                {/* 내용 입력 */}
                <div className="flex flex-row items-start">
                    <span className="min-w-[94px] pt-[14px] medium-14 text-gray-400">내용</span>
                    <div className="flex-1">
                        <AdminTextEditor content={content} setContent={setContent} />
                    </div>
                </div>

                {/* 첨부파일 */}
                <div className="flex flex-row items-start">
                    <span className="min-w-[94px] pt-2 medium-14 text-gray-400">첨부파일</span>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <button
                                className="px-3 py-2 regular-14 text-gray-25 rounded-sm bg-gray-300"
                                onClick={openFileDialog}
                            >
                                파일 첨부
                            </button>
                            <span className="text-sm text-[#A7A7A7]">
                                일반파일 현재{totalSizeMB}KB/전체10MB
                            </span>
                        </div>

                        {/* Drag 영역 */}
                        {files.length <= 0 && (
                            <div
                                className="w-full h-16 border border-gray-100 rounded-sm 
                                flex items-center justify-center text-sm text-gray-600 bg-white"
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
                                            {(file.size / 1024 / 1024).toFixed(2)}KB
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
