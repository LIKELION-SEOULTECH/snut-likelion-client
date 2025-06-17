import sample1 from "@/assets/home/sample1.png";
import sample2 from "@/assets/home/sample2.png";
import greenmate from "@/assets/project/green-mate.png";

export const mockProjectList = Array.from({ length: 50 }, (_, index) => {
    const id = index + 1;
    return {
        id,
        title: `드링클리 ${id}`,
        description: `설명 ${id} - 호버하면 보이는 영역입니다!`,
        class: ["13기", "12기", "11기"][id % 3],
        tag: ["아이디어톤", "해커톤", "데모데이"][id % 3],
        image: id % 3 === 0 ? sample1 : id % 3 === 1 ? sample2 : greenmate,
        stack: ["web", "app", "ai"].filter((_, i) => (id + i) % 2 === 0)
    };
});
