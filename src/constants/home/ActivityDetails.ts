import activity_1_1 from "@/assets/home/activityDetail/activity_1_1.png";
import activity_1_2 from "@/assets/home/activityDetail/activity_1_2.png";

import activity_2_1 from "@/assets/home/activityDetail/activity_2_1.png";
import activity_2_2 from "@/assets/home/activityDetail/activity_2_2.png";

import activity_3_1 from "@/assets/home/activityDetail/activity_3_1.png";
import activity_3_2 from "@/assets/home/activityDetail/activity_3_2.png";

import activity_4_1 from "@/assets/home/activityDetail/activity_4_1.png";
import activity_4_2 from "@/assets/home/activityDetail/activity_4_2.png";

export type ActivityDetail = {
    tag: string;
    title: string;
    description: string;
    images: string[];
};

export const activityDetails: ActivityDetail[] = [
    {
        tag: "정기",
        title: "세션 및 스터디",
        description:
            "기획, 디자인, AI, 백엔드, 프론트엔드 각 분야의 운영진이 직접 주도하는 세션을 진행합니다.\n각 파트의 기초 역량부터 심화 내용까지 체계적으로 다루며, 실무 중심의 학습으로 팀 프로젝트를 수행할 수 있는 기반을 마련합니다.",
        images: [activity_1_1, activity_1_2]
    },
    {
        tag: "",
        title: "",
        description:
            "정기 세션과 스터디를 통해 기초 역량을 쌓은 후, 본격적인 팀프로젝트에 참여하며 실전 경험을 쌓아갑니다.",
        images: []
    },
    {
        tag: "5월",
        title: "아이디어톤",
        description:
            "정해진 주제에 맞춰 창의적이고 실현 가능한 아이디어로 경쟁합니다. 짧은 시간 동안 기획부터 발표까지 전 과정을 경험하며,\n기획력과 팀워크를 함께 키울 수 있습니다. 재미와 긴장감 속에서 여러분의 아이디어가 빛나는 순간을 만들어보세요.",
        images: [activity_2_1, activity_2_2]
    },
    {
        tag: "8월",
        title: "중앙해커톤",
        description:
            "중앙해커톤은 멋쟁이사자처럼 대학이 주최하는, 역대 최대 규모의 무박 2일 해커톤 행사입니다.\n 정해진 주제가 공개되면 참가자들은 팀을 구성하여, 주어진 시간 내에 창의적인 아이디어를 구현해 나갑니다.\n 기획부터 디자인, 개발까지 전 과정을 경험할 수 있는 집중적이고 실전적인 프로그램으로, 실력을 한 단계 성장시킬 수 있는 기회입니다.",
        images: [activity_3_1, activity_3_2]
    },
    {
        tag: "12월",
        title: "데모 데이",
        description:
            "짧은 기간 동안 실제 제품 출시를 목표로 몰입해, 실현 가능한 아이디어를 완성도 높게 구현하고 발표를 통해 공유합니다.\n일부 프로젝트는 실제 서비스로 런칭되기도 하고 열정과 실행력이 만나는 순간이자, 미래 창업가들이 첫걸음을 내딛는 출발점이 됩니다.",
        images: [activity_4_1, activity_4_2]
    }
];
