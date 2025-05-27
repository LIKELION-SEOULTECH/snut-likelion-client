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
    image: string;
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

        description: `${id} - 저는 쉬운 사람입니다! 물음표보단 느낌표를 던지는 확실한 사람이에요저는 쉬운 사람입니다! 물음표보단 느낌표를 던지는 확실한 사람이에요저는 쉬운 사람입니다! 물음표보단 느낌표를 던지는 확실한 사람이에요저는 쉬운 사람입니다! 물음표보단 느낌표를 던지는 확실한 사람이에요`,
        image: id % 2 === 0 ? memberSample1 : memberSample2
    };
});
