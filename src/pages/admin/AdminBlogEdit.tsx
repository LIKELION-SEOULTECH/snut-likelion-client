import AdminTextEditor from "@/components/text-editor/AdminTextEditor";
import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import AdminTagEditor from "@/components/text-editor/AdminTagEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import sample from "@/assets/home/sample.png";
import sample1 from "@/assets/home/sample1.png";
import { getBlogDetail } from "@/apis/main/blog";
import { ADMIN_ABS } from "@/routes/routes";
import { CustomSelect } from "@/components/admin/common/custom-select";

type MentionSuggestion = {
    id: string;
    mentionLabel: string;
    avatarUrl: string;
};

export const AdminBlogEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<MentionSuggestion[]>([]);

    const numericPostId = Number(id);

    const isFormValid = title.trim() !== "" && type.trim() !== "" && content.trim() !== "";

    const { data: adminBlog } = useQuery({
        queryKey: ["blog", numericPostId],
        queryFn: () => getBlogDetail(numericPostId),
        enabled: !!numericPostId && !isNaN(numericPostId)
    });

    useEffect(() => {
        if (adminBlog) {
            setTitle(adminBlog.data.title);
            setContent(adminBlog.data.contentHtml);
            setType(adminBlog.data.category);

            const tagData: MentionSuggestion[] =
                adminBlog.data.taggedMemberIds?.map((tag: string, index: number) => ({
                    id: `${index}`,
                    mentionLabel: tag,
                    avatarUrl: index % 2 === 0 ? sample : sample1
                })) || [];

            setTags(tagData);
        }
    }, [adminBlog]);

    const handleBackBtn = () => {
        navigate(ADMIN_ABS.BLOG);
    };

    return (
        <AdminLayout
            isFormValid={isFormValid}
            onClickBackBtn={handleBackBtn}
            onSubmit={() => {
                alert("수정로직 추가");
            }}
        >
            <div className="w-full flex flex-col bg-white mt-11 rounded-sm p-12 mb-12 pl-[33px] pr-10 py-10 gap-8">
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
            </div>
        </AdminLayout>
    );
};
