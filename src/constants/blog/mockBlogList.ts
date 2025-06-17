import sample from "@/assets/home/sample.png";

export const mockBlogList = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "세션 이야기" : "프로젝트 회고",
    title: "첫 번째 중앙 해커톤 후기 feat. 본선 진출",
    date: `2025.09.${((i % 30) + 1).toString().padStart(2, "0")}`,
    imageUrl: sample
}));
