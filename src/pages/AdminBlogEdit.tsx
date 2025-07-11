import AdminTextEditor from "@/components/text-editor/AdminTextEditor";
import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import AdminTagEditor from "@/components/text-editor/AdminTagEditor";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminSingleBlog } from "@/apis/blog";

import sample from "@/assets/home/sample.png";
import sample1 from "@/assets/home/sample1.png";

type MentionSuggestion = {
    id: string;
    mentionLabel: string;
    avatarUrl: string;
};

export const AdminBlogEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<MentionSuggestion[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const numericPostId = Number(id);

    const { data: adminBlog } = useQuery({
        queryKey: ["blog", numericPostId],
        queryFn: () => fetchAdminSingleBlog(numericPostId),
        enabled: !!numericPostId && !isNaN(numericPostId)
    });

    useEffect(() => {
        if (adminBlog) {
            setTitle(adminBlog.title);
            setContent(adminBlog.contentHtml);

            const tagData: MentionSuggestion[] =
                adminBlog.taggedMemberNames?.map((tag: string, index: number) => ({
                    id: `${index}`,
                    mentionLabel: tag,
                    avatarUrl: index % 2 === 0 ? sample : sample1
                })) || [];

            setTags(tagData);
        }
    }, [adminBlog]);

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

    return (
        <AdminLayout>
            <div className="w-full flex flex-col bg-white mt-11 rounded-sm p-12 mb-12 pl-[33px] pr-10 py-10 gap-8">
                <div className="flex flex-row gap-[18px] items-center">
                    <span className="w-19 text-sm font-medium text-[#666666]">제목</span>
                    <input
                        className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-row gap-[18px] items-center">
                    <span className="w-19 text-sm font-medium text-[#666666]">태그</span>
                    <div className="flex-1">
                        <AdminTagEditor tags={tags} setTags={setTags} />
                    </div>
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
