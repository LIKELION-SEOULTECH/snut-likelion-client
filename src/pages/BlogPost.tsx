import { useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import { ChevronDown } from "lucide-react";
import TextEditor from "@/components/text-editor/TextEditor";
import TagEditor from "@/components/text-editor/TagEditor";
import { createBlogPost } from "@/apis/blog";
import type { BlogCategory } from "@/types/blog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";

export const BlogPostPage = () => {
    const [type, setType] = useState<BlogCategory>("OFFICIAL");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<number[]>([]);

    const [content, setContent] = useState(
        "<h1>멋냥냥단 귀여워</h1><p>전라북도 군산 명월동에서 진행된 <맥심골목> 프로모션을 위해 우리는 오프라인과 온라인 경험을 이어줄 아이디어가 필요했고, 맥심골목을 방문한 사용자들이 9개의 주요 지정 장소를 돌아다니며 디지털 스탬프를 수집하고 빙고를 완성하는 참여형 이벤트를 기획했습니다. 지정된 장소마다 특별히 제작된 디지털 스탬프를 비치해두고 이는 사용자의 <맥심 마이 포인트>앱을 통해 작동하도록 특별히 설계되었습니다.</p>"
    );

    const isUploadEnabled = title.trim() !== "" && tags.length > 0 && content.trim() !== "";

    const handleSubmit = async (submit: boolean) => {
        try {
            await createBlogPost(
                {
                    title,
                    contentHtml: content,
                    category: type,
                    taggedMemberIds: [],
                    images: []
                },
                submit
            );
            alert("블로그 업로드 완료!");
        } catch (error) {
            console.error(error);
            alert("업로드 실패");
        }
    };

    return (
        <PageLayout
            white={true}
            isPost={true}
            isUploadEnabled={isUploadEnabled}
            onSubmit={() => handleSubmit(true)}
        >
            <div className="flex flex-col px-[215px] pt-20 pb-100">
                <div className="w-50 relative">
                    <Select value={type} onValueChange={(value) => setType(value as BlogCategory)}>
                        <SelectTrigger className="w-full h-12 appearance-none bg-[#ECECEC] text-[#2D2D2D] text-2xl rounded-full px-[21px] focus:outline-none [&_svg]:hidden">
                            <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="OFFICIAL">세션 이야기</SelectItem>
                            <SelectItem value="UNOFFICIAL">프로젝트 회고</SelectItem>
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
                    <TextEditor content={content} setContent={setContent} />
                </div>
            </div>
        </PageLayout>
    );
};
