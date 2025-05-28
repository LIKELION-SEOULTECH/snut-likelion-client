import memberSample1 from "@/assets/Member/MemberSample1.png";
import memberSample2 from "@/assets/Member/MemberSample2.png";

export interface MemberInfo {
    id: number;
    name: string;
    generation: string;
    tag: string;

    role: string;
    major: string;

    description: string;
    description2: string;
    image: string;

    email: string;
    github: string;
    velog: string;
}

export const mockMemberData: MemberInfo[] = Array.from({ length: 50 }, (_, index) => {
    const id = index + 1;
    return {
        id,
        name: `안정후 ${id}`,
        generation: ["13기", "12기", "11기"][index % 3],
        tag: ["대표", "운영진", "아기사자"][index % 3],

        role: ["기획", "디자인", "프론트엔드", "백엔드", "AI"][index % 5],
        major: `전자 IT 미디어공학과 ${id}`,

        description: `저는 쉬운 사람입니다!\n 물음표보단 느낌표를 던지는 확실한 사람이에요. - ${id} `,
        description2: `제가 느끼는 인생이란 삶의 선택의 연속인 것 같아요\n선택들이 모여서 순간을 만들고, 그 순간들이 모여서 삶의 질을 결정하니까.\n25년은 멋사의 대표로서 모든 순간에 책임을 지고, 모두를 기대하게 하는 선택을 하고 싶어요.\n그렇게 모든 순간이 행복한 영원이기를..ㅎㅎ - ${id} `,

        image: id % 2 === 0 ? memberSample1 : memberSample2,

        email: "parkjoah@naver.com",
        github: "https://github.com/parkjoah",
        velog: "https://github.com/parkjoah"
    };
});
