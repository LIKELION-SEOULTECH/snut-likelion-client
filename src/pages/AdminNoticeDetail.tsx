import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchNoticeById } from "@/apis/notice";
import AdminLayout from "@/layouts/AdminLayout";

export const AdminNoticeDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: notice } = useQuery({
        queryKey: ["notice", id],
        queryFn: () => fetchNoticeById(Number(id)),
        enabled: !!id
    });

    return (
        <AdminLayout>
            {notice && (
                <div className="w-full flex flex-col bg-white mt-11 rounded-sm p-12 mb-12">
                    <div className="text-2xl font-bold text-[#FFA454] mb-5">공지</div>
                    <div className="text-[50px] font-bold whitespace-nowrap mb-[37px]">
                        {notice.title}
                    </div>
                    <div className="font-light text-[#666666] text-xl mb-[35px]">
                        {new Date(notice.updatedAt).toISOString().slice(0, 10)}
                    </div>
                    {notice && (
                        <div
                            className="text-xl"
                            dangerouslySetInnerHTML={{ __html: notice.content }}
                        />
                    )}
                </div>
            )}
        </AdminLayout>
    );
};
