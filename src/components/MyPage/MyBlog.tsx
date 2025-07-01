interface BlogPost {
    id: number;
    category: string;
    title: string;
    date: string;
}

const dummyPosts: BlogPost[] = [
    { id: 1, category: "세션이야기", title: "제목제목제목제목", date: "2025.03.01" },
    { id: 2, category: "세션이야기", title: "제목제목제목제목", date: "2025.03.01" }
];

export const MyBlog = () => {
    return (
        <div className="flex-1 flex flex-col mt-0 text-white mb-[120px] cursor-pointer">
            {/* 구분선 */}
            <div className="w-full h-[2px] bg-[#C4C4C4]" />

            {/* 블로그들 */}
            {dummyPosts.map((post, idx) => (
                <div key={post.id} className="w-full">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex gap-4">
                            <span className="text-[18px] text-[#ECECEC] w-[120px]">
                                {post.category}
                            </span>
                            <span className="text-[18px] text-[#C4C4C4] font-medium">
                                {post.title}
                            </span>
                        </div>
                        <div className="text-[18px] text-[#C4C4C4] font-light">{post.date}</div>
                    </div>

                    {/* 중간 1px 선 (마지막 요소 뺴고) */}
                    {idx !== dummyPosts.length - 1 && (
                        <div className="w-full h-[1px] bg-[#C4C4C4]" />
                    )}
                </div>
            ))}

            {/* 구분선 */}
            <div className="w-full h-[2px] bg-[#C4C4C4]" />
        </div>
    );
};
