import { useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import { ChevronDown } from "lucide-react";
import TextEditor from "@/components/text-editor/TextEditor";
import TagEditor from "@/components/text-editor/TagEditor";

import type { BlogCategory } from "@/types/blog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { createBlog } from "@/apis/main/blog";

export const BlogPostPage = () => {
    const [type, setType] = useState<BlogCategory>("OFFICIAL");

    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<number[]>([]);
    const [images, setImages] = useState<string[]>([]);

    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const isUploadEnabled = title.trim() !== "" && tags.length > 0 && content.trim() !== "";

    const handleSubmit = async (submit: boolean) => {
        console.log("images 상태:", images); // ✅ 확인

        try {
            await createBlog(
                {
                    title,
                    contentHtml: content,
                    category: type,
                    taggedMemberIds: tags,
                    images
                },
                submit
            );
            navigate("/blog");
        } catch (error) {
            console.error(error);
            alert("업로드 실패");
        }
    };

    //나가기
    const handleExit = () => {
        navigate(-1);
    };

    return (
        <PageLayout
            white={true}
            isPost={true}
            isUploadEnabled={isUploadEnabled}
            onSubmit={() => handleSubmit(true)}
            onExit={handleExit}
        >
            <div className="flex flex-col px-[215px] pt-20 pb-100">
                <div className="w-50 relative">
                    <Select value={type} onValueChange={(value) => setType(value as BlogCategory)}>
                        <SelectTrigger className="w-full h-12 appearance-none bg-[#ECECEC] text-[#2D2D2D] text-2xl rounded-full px-[21px] focus:outline-none [&_svg]:hidden">
                            <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="OFFICIAL">세션 이야기</SelectItem>
                            <SelectItem value="UNOFFICIAL">아기사자 이야기</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <ChevronDown size={22} className="text-[#A7A7A7]" />
                    </div>
                </div>
                {/* text editor */}
                <div className="mt-[49px]">
                    <input
                        placeholder="제목을 입력하세요"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-[50px] font-bold placeholder:text-[#C4C4C4] focus:outline-none focus:border-none"
                    />
                </div>
                <div className="w-28 border-t-[4px] border-[#000000] mt-[36px] mb-[45px]" />
                <TagEditor setTags={setTags} />
                <div className="mt-25">
                    <TextEditor content={content} setContent={setContent} setImages={setImages} />
                </div>
            </div>
        </PageLayout>
    );
};
