import AdminTextEditor, { type AdminEditorHandle } from "@/components/text-editor/AdminTextEditor";
import { useRef, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import AdminTagEditor from "@/components/text-editor/AdminTagEditor";

import { useNavigate } from "react-router-dom";
import { ADMIN_ABS } from "@/routes/routes";
import { CustomSelect } from "@/components/admin/common/custom-select";
import { Input } from "@/components/ui/input";
import { createAdminBlog } from "@/apis/admin/blog";
import { useMutation } from "@tanstack/react-query";

type MentionSuggestion = {
    id: string;
    mentionLabel: string;
    avatarUrl: string;
};

export const AdminBlogCreatePage = () => {
    const navigate = useNavigate();
    const editorRef = useRef<AdminEditorHandle>(null);

    const [title, setTitle] = useState("");
    const [type, setType] = useState<"OFFICIAL" | "UNOFFICIAL" | "">("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<MentionSuggestion[]>([]);

    const handleBackBtn = () => {
        navigate(ADMIN_ABS.BLOG);
    };

    const createBlogMutation = useMutation({
        mutationFn: async () => {
            if (!editorRef.current) {
                throw new Error("Editor not ready");
            }

            const { html, imageUrls } = await editorRef.current.getFinalHtmlAndImages();

            return createAdminBlog({
                title,
                category: type,
                contentHtml: html,
                images: imageUrls,
                taggedMemberIds: tags.map((t) => Number(t.id))
            });
        },
        onSuccess: () => {
            alert("블로그가 등록되었습니다.");
            navigate(ADMIN_ABS.BLOG);
        },
        onError: (error) => {
            console.error(error);
            alert("블로그 등록 실패");
        }
    });
    const handleSubmit = () => {
        if (!isFormValid || createBlogMutation.isPending) return;
        createBlogMutation.mutate();
    };

    const isFormValid = title.trim() !== "" && type.trim() !== "" && content.trim() !== "";

    return (
        <AdminLayout
            isFormValid={isFormValid}
            onSubmit={handleSubmit}
            onClickBackBtn={handleBackBtn}
        >
            <div className="w-full flex flex-col bg-white mt-11 rounded-sm p-12 mb-12 pl-[33px] pr-10 py-10 gap-8 min-w-200">
                <div className="flex flex-row h-11 gap-[18px] items-center">
                    <span className="w-19 medium-14 text-gray-400">카테고리</span>

                    <div className="w-59">
                        <CustomSelect
                            value={type}
                            onValueChange={setType}
                            placeholder="구분"
                            selectList={[
                                { label: "세션 이야기", value: "OFFICIAL" },
                                { label: "프로젝트 회고", value: "UNOFFICIAL" }
                            ]}
                        />
                    </div>
                </div>

                <div className="h-11 flex flex-row gap-[18px] items-center">
                    <span className="w-19 text-sm font-medium text-[#666666]">제목</span>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-full flex-1 px-4 border border-[#C4C4C4] rounded-sm focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
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
                        <AdminTextEditor
                            ref={editorRef}
                            content={content}
                            setContent={setContent}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
