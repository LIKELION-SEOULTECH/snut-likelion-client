import AdminTextEditor from "@/components/text-editor/AdminTextEditor";
import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import AdminTagEditor from "@/components/text-editor/AdminTagEditor";
type MentionSuggestion = {
    id: string;
    mentionLabel: string;
    avatarUrl: string;
};

export const AdminBlogCreatePage = () => {
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<MentionSuggestion[]>([]);

    return (
        <AdminLayout>
            <div className="w-full flex flex-col bg-white mt-11 rounded-sm p-12 mb-12 pl-[33px] pr-10 py-10 gap-8">
                <div className="flex flex-row gap-[18px] items-center">
                    <span className="w-19 text-sm font-medium text-[#666666]">제목</span>
                    <input className="flex-1 h-11 px-4 border border-[#C4C4C4] rounded-sm" />
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
            </div>
        </AdminLayout>
    );
};
