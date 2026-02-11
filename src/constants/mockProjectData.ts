import type { ProjectDetailResponse, RetrospectionResponse } from "@/types/project";
import sampleIMG from "@/assets/common/sampleBox.png";

export const mock13thProjectData = [
    //아이디어톤
    {
        id: 101,
        name: "가치가요",
        description: "이동이 불편한 교통약자를 위한 사용자 참여형 길찾기 & 제보 플랫폼",
        generation: 13,
        category: "아이디어톤",
        thumbnailUrl: "",
        tags: ["web", "ai"]
    },
    {
        id: 102,
        name: "Pill My Rithm",
        description: "유학생에게 두통약이 필요한 순간",
        generation: 13,
        category: "아이디어톤",
        thumbnailUrl: "",
        tags: ["web", "app"]
    },
    {
        id: 103,
        name: "Haearim",
        description: "슬픔 속 마지막 절차를 함께 돕는 조력자가 되어줄 서비스",
        generation: 13,
        category: "아이디어톤",
        thumbnailUrl: "",
        tags: ["app"]
    },
    {
        id: 104,
        name: "밥은 먹고 댕기나",
        description: "혼밥보다는 함께 식사하고 싶은 순간을 위한 서비스",
        generation: 13,
        category: "아이디어톤",
        thumbnailUrl: "",
        tags: ["app"]
    },
    {
        id: 105,
        name: "OpenFrame",
        description: "아이디어가 떠오르지 않는 순간을 위한 AI 아이데이션 어시스턴트",
        generation: 13,
        category: "아이디어톤",
        thumbnailUrl: "",
        tags: ["app"]
    },
    //해커톤
    {
        id: 201,
        name: "워닛",
        description: "유휴시간을 공간 공유로 채우는 지역 상권 활성화 서비스",
        generation: 13,
        category: "해커톤",
        thumbnailUrl: "",
        tags: ["app"]
    },
    {
        id: 202,
        name: "EMO:D",
        description: "자폐 스펙트럼 아동을 위한 대화형 AI 일기 & 표정 훈련 서비스",
        generation: 13,
        category: "해커톤",
        thumbnailUrl: "",
        tags: ["web", "app"]
    },
    {
        id: 203,
        name: "구석구석",
        description: "정성・정량 데이터를 한 눈에! 예비 창업자를 위한 똑똑한 지역 상권 분석 서비스",
        generation: 13,
        category: "해커톤",
        thumbnailUrl: "",
        tags: ["app"]
    },
    {
        id: 204,
        name: "잇고",
        description: "소상공인의 잉여재고를 효율적으로 공유·활용하도록 돕는 재고 나눔 플랫폼 ",
        generation: 13,
        category: "해커톤",
        thumbnailUrl: "",
        tags: ["app"]
    },
    {
        id: 205,
        name: "밥먹댕",
        description: "혼밥보다는 함께 식사하고 싶은 순간을 위한 서비스",
        generation: 13,
        category: "해커톤",
        thumbnailUrl: "",
        tags: ["app"]
    }
];

export const mockProjectDetails: Record<number, ProjectDetailResponse> = {
    //아이디어톤
    101: {
        id: 101,
        name: "가치가요",
        intro: "이동이 불편한 교통약자를 위한 사용자 참여형 길찾기 & 제보 플랫폼",
        description:
            '우리에게는 그저 일상적인 길이, 누군가에게는 도전입니다.  이동은, 먼저 아는 것에서 시작됩니다. "가치가요"는 사진 한 장으로 불편한 길을 제보하면 AI가 자동으로 위험 요소를 판단해 교통 약자를 비롯해누구에게나 안전한 길을 찾을 수 있도록 돕는 시민 참여형 서비스입니다.',
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["길찾기", "교통약자", "웹"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "아이디어톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    102: {
        id: 102,
        name: "Pill My Rithm",
        intro: "유학생에게 두통약이 필요한 순간",
        description:
            "‘Pill My Rithm’은 언어 장벽으로 인해 의약품 복용에 어려움을 겪는 재한 외국인을 위한 맞춤형 서비스입니다. AI와 알고리즘 기반 기능을 통해 증상에 맞는 의약품 검색, 상비약 추천, 약국 찾기, 복약 관리 등의 서비스를 제공하며 재한 외국인에게 안전하고 편리한 복약 환경을 제공합니다. ",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "아이디어톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    103: {
        id: 103,
        name: "Haearim",
        intro: "슬픔 속 마지막 절차를 함께 돕는 조력자가 되어줄 서비스",
        description:
            "소중한 존재를 떠나보낸 적이 있으신가요? 사후 절차에 대한 어려움은 지식 부족, 정보 탐색의 어려움 등의 이유로 20~40대 청년층 유족에게 특히 보편적으로 발생합니다. ’헤아림’은 슬픔 속 유족의 실무 부담을 최소화하여 유족이 겪는 ‘슬픔과 실무 처리의 이중고' 문제를 AI 기술로 해결하고자 합니다. ",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "아이디어톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    104: {
        id: 104,
        name: "밥은 먹고 댕기나",
        intro: "혼밥보다는 함께 식사하고 싶은 순간을 위한 서비스",
        description:
            "‘혼밥은 싫지만 누군가에게 먼저 연락하긴 망설여지는 순간’ ‘밥먹댕’은 편한 사람들과 함께, 누구나 만족할 식사 약속을 쉽게 잡아주는 AI 기반 식사 메이트 매칭 서비스입니다. 오늘 밥은 챙겨 먹었는지, 가볍게 안부를 나누며 좋은 사람과 따뜻한 한 끼를 함께하세요.",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "아이디어톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    105: {
        id: 105,
        name: "OpenFrame",
        intro: "아이디어가 떠오르지 않는 순간을 위한AI 아이데이션 어시스턴트",
        description:
            "OpenFrame은 사용자가 메모를 작성하며 비슷한 의견, 중립적인 관점, 반대 의견을 제시하여 사용자가 자신의 생각을 다각도로 검토할 수 있도록 돕는 아이데이션 툴입니다. 이 과정을 통해 사용자들은 고정된 사고에서 벗어나 창의적이고 유연한 사고를 확장할 수 있습니다.",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "아이디어톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    //해커톤
    201: {
        id: 201,
        name: "워닛",
        intro: "유휴시간을 공간 공유로 채우는 지역 상권 활성화 서비스 ",
        description:
            "서울특별시 노원구의 대학 상권은 방학 기간 매출 공백과 낮은 소비력으로 어려움에 직면해 있습니다. 워닛은 이러한 위기를 기회로 바꾸는 서비스입니다. 운영하지 않는 시간 동안 가게 공간을 대여해 추가 수익을 창출하고, 대학생과 지역 주민은 합리적인 가격에 여가 공간을 쉽게 찾을 수 있습니다. 또한 AI 기반 반납 시스템을 탑재하여 공간 대여의 신뢰도를 높였습니다. ",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "해커톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    202: {
        id: 202,
        name: "EMO:D",
        intro: "자폐 스펙트럼 아동을 위한 대화형 AI 일기 & 표정 훈련 서비스",
        description:
            "‘이모다'는 비언어적 소통에 어려움을 느끼는 자폐 스펙트럼 아동의 감정 소통 능력을 향상시키는 AI 기반 대화형 일기 & 표정 훈련 서비스입니다. 아동이 AI와으이 상호작용을 통해 감정 표현 능력을 자연스럽게 습득하며, 보호자와의 소통을 강화하는 것을 목표로 합니다. ",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "해커톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    203: {
        id: 203,
        name: "구석구석",
        intro: "정성・정량 데이터를 한 눈에! 예비 창업자를 위한 똑똑한 지역 상권 분석 서비스",
        description:
            "구석구석은 단순한 수치 제시에 그치지 않고, 정성적 데이터를 함께 반영하는 상권 분석 서비스입니다. SNS 등의 플랫폼에서 실시간 생활 데이터를 수집 · 분석하고, 이를 인구 구조 · 소득 수준 · 부동산 시세 등 정량 데이터와 결합합니다. 창업자는 이를 통해 단순한 유동인구 지표를 넘어, 고객의 맥락과 행동 패턴까지 고려한 맞춤형 리포트를 받아볼 수 있으며, 보다 정교한 전략 수립으로 시행착오를 줄이고 성공 가능성을 높일 수 있습니다.",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "해커톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    204: {
        id: 204,
        name: "잇고",
        intro: "소상공인의 잉여재고를 효율적으로 공유·활용하도록 돕는 재고 나눔 플랫폼",
        description:
            "잇고를 통해 재고를 나누고, 소상공인을 연결해 상생 구조를 활성화함으로써 공릉동 상권의 지속가능한 성장과 서로 돕는 협렵적 지역 상권 문화를 만들어 나갑니다. ",
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "해커톤",
        imageUrls: [sampleIMG, sampleIMG]
    },
    205: {
        id: 205,
        name: "밥먹댕",
        intro: "혼밥보다는 함께 식사하고 싶은 순간을 위한 서비스",
        description: `혼밥은 싫지만 누군가에게 먼저 연락하긴 망설여지는 순간, ‘밥먹댕’은 편한 사람들과 함께, 누구나 만족할 식사 약속을 쉽게 잡아주는 AI 기반 식사 메이트 매칭 서비스입니다. 오늘 밥은 챙겨 먹었는지, 가볍게 안부를 나누며 좋은 사람과 따뜻한 한 끼를 함께하세요.`,
        generation: 13,
        websiteUrl: null,
        playstoreUrl: null,
        appstoreUrl: null,
        tags: ["공간공유", "소상공인", "앱"],
        members: [
            { id: 101, username: "멋쟁이" },
            { id: 201, username: "멋쟁이" },
            { id: 301, username: "멋쟁이" }
        ],
        category: "해커톤",
        imageUrls: [sampleIMG, sampleIMG]
    }
};

export const mockProjectRetrospections: Record<number, RetrospectionResponse[]> = {
    101: [
        {
            id: 1,
            content:
                "AI를 활용하여 다양한 아이디어를 낼 수 있어서 좋았어요! AI를 활용하여 기존의 문제를 해결하는 다양한 아이디어를 나누고, 다른 팀들의 아이디어를 함께 볼 수 있어서 많이 배울 수 있는 시간이였습니다. ",
            writer: {
                id: 3,
                name: "전민경",
                part: "PM"
            }
        },
        {
            id: 2,
            content:
                "베리어프리 앱으로 쉬운 길을 안내하고 관련 장소를 소개하는 아이디어를 구상하는 시간이 재밌었습니다. 아이디어를 현실적으로 구현 가능한지 팀원들과 깊게 이야기해본 과정 자체가 진짜 값진 경험이었습니다.",
            writer: {
                id: 3,
                name: "박진아",
                part: "Design"
            }
        },
        {
            id: 3,
            content:
                "서로의 의견을 피드백하는 과정에서 더 열심히 준비하게 되었고 자신의 아이디어를 명확하게 전달하는 시간이 도움이 많이 되었습니다.",
            writer: {
                id: 3,
                name: "김경태",
                part: "Back-end"
            }
        }
    ],
    102: [
        {
            id: 4,
            content:
                "AI를 적용한 프로젝트를 처음 해봤는데, 아이디어를 구상하는 과정부터 정말 재미있었습니다. 다른 팀들의 아이디어에 대해 피드백을 주고받으면서 서로 배우는 점도 많았고, 분위기도 굉장히 좋았어요. 멋쟁이사자처럼 본사에도 직접 가볼 수 있어서 전반적으로 더 기억에 남는 경험이었습니다!",
            writer: {
                id: 3,
                name: "이예한",
                part: "Design"
            }
        },
        {
            id: 5,
            content:
                "AI를 활용하는 여러 아이디어를 자유롭게 내보고, 팀원들과 함께 기획을 구체화해 나가는 과정이 재미있었습니다. 서로의 아이디어를 공유하고 발전시키면서 다양한 관점을 배울 수 있었고, 짧은 시간이었지만 기획 전반을 경험해볼 수 있어 의미 있는 시간이었습니다.",
            writer: {
                id: 3,
                name: "박조아",
                part: "Front-end"
            }
        },
        {
            id: 6,
            content:
                "서비스 관점의 아이디어 구상이 처음이었는데 불구하고 좋은 아이디어와 함께 좋은 피드백을 받아서 멋쟁이사자처럼 본사까지 가게 된 좋은 경험이었습니다",
            writer: {
                id: 3,
                name: "조한별",
                part: "AI"
            }
        },
        {
            id: 7,
            content:
                "서비스에 어떤 인공지능 기능이 쓰일 수 있을지 탐색하고 깊이 있게 이해하는 기회였습니다.",
            writer: {
                id: 3,
                name: "임가영",
                part: "AI"
            }
        }
    ],
    //해아림
    103: [
        {
            id: 8,
            content:
                "평소 다루어보지 못했던 주제로 진행되었던 프로젝트라 기억에 남는 것 같습니다. 서비스가 구체화되기까지 많은 어려움이 있었지만, 유능하고 열정 넘치는 팀원들이 있었기에 무사히 마칠 수 있었다고 생각합니다.",
            writer: {
                id: 3,
                name: "정재현",
                part: "PM"
            }
        },
        {
            id: 9,
            content:
                "복잡한 사후행정절차를 돕는 AI라는 색다른 접근을 중심으로 아이디어를 구체화했습니다. 리서치부터 서비스 플로우, BM까지 전반적인 기획 과정을 직접 다뤄볼 수 있는 의미있는 경험이였습니다!",
            writer: {
                id: 3,
                name: "임도협",
                part: "Front-end"
            }
        }
    ],
    104: [
        {
            id: 10,
            content:
                "구현 부담 없이 AI를 활용해 팀원들과 자유롭게 브레인 스토밍하며, ‘혼밥·관계 단절’ 같은 현실 문제를 자연스럽게 서비스 아이디어로 구체화할 수 있어 좋은 경험이었습니다. “친구와 자연스럽게 만나고, 같이 먹고, 더 가까워지는 식사 메이트 플랫폼”이라는 뚜렷한 방향성에 맞추어 서비스를 기획할 수 있었습니다. 특히 ‘좋은 기능’에서 끝나는 것이 아니라, ‘비즈니스 모델’까지 같이 고민한 경험을 통해 기획 관점을 넓힐 수 있었습니다.",
            writer: {
                id: 3,
                name: "김성휘",
                part: "Back-end"
            }
        }
    ],
    105: [
        {
            id: 11,
            content:
                "AI를 이용한 실생활 속 문제 해결이라는 주제 아래, 하나의 아이디어를 정답처럼 정하기보다 팀원들의 다양한 시각을 듣고 함께 확장해 나가는 과정이 기억에 남았습니다. 같은 문제를 두고도 접근 방식이 달라 여러 방향으로 고민해볼 수 있었고, 그 과정 자체가 즐겁고 의미 있었습니다.",
            writer: {
                id: 3,
                name: "노경인",
                part: "Front-end"
            }
        }
    ],

    201: [
        {
            id: 12,
            content:
                "대학 상권의 불안정한 매출 구조라는 painpoint 에서 출발하여 탄생한 서비스입니다. 이 서비스의 필요성을 논리적으로 설명하기 위해 정말 많은 리서치와 분석 과정이 있었습니다. 오랜 시간 고생한 만큼 개인적으로 만족스러운 결과였다고 생각합니다. 유능한 팀원들이 모두 한마음 한 뜻으로 고생한 덕에 최종 결과물 역시 매우 완성도 높게 나올 수 있었습니다. 우리 꿍실사자단은 역시 최고인 것 같습니다.",
            writer: {
                id: 3,
                name: "정재현",
                part: "PM"
            }
        },
        {
            id: 13,
            content:
                "실력 있는 팀원들과 함께하며 저 스스로의 기준이 높아졌고, 끝까지 열심히 할 수 있었습니다! 공간 신뢰 대여라는 새로운 접근을 통해 단순한 공간 공유를 넘어서는 서비스를 설계했고, 디자인부터 앱, 서버까지 기술적으로나, 기획적으로도 완성도 높은 결과물을 구현해서 자랑스러웠습니다! 꿍실사자단 수고 많았고, 모두 잘되면 좋겠습니다!",
            writer: {
                id: 3,
                name: "임도협",
                part: "Front-end"
            }
        },
        {
            id: 14,
            content:
                "AI가 문제를 해결할 수 있도록 고민해보는 과정을 경험했습니다. 더 나아가 실제로 구현해보며 뿌듯하다고 느꼈습니다. 또한, 학생들과 열심히 프로젝트 구성하는 추억도 남겼고 상위 팀으로 선정되어 기뻤습니다.",
            writer: {
                id: 3,
                name: "임가영",
                part: "AI"
            }
        }
    ],
    202: [
        {
            id: 15,
            content:
                "이모디 프로젝트를 장기적으로 이어가면서 팀원들과 계속해서 피드백을 주고받는 과정이 정말 재미있었습니다. 협업하면서 다양한 아이디어를 자유롭게 나눌 수 있었고, 유니버설 디자인이라는 주제를 중심으로 프로젝트를 진행한 점도 새롭고 의미 있게 느껴졌어요. 함께 고생한 팀원들 모두 정말 감사합니다!",
            writer: {
                id: 3,
                name: "이예한",
                part: "Design"
            }
        }
    ],
    203: [
        {
            id: 16,
            content:
                "짧은 시간이었지만 바쁜 와중에 서로 시간을 내서 열정을 태웠던 시간들이 기억에 남아요. 이 기간동안 밀도있게 성장할 수 있었던 것 같아요",
            writer: {
                id: 3,
                name: "김경태",
                part: "Back-end"
            }
        }
    ],
    204: [
        {
            id: 17,
            content:
                "짧은 기간동안 팀원들과 협업하며 하나의 프로젝트를 완성할 수 있는 경험을 할 수 있었어요. 개발자/디자이너 분들과 같이 밤새며 프로젝트를 할 수 있어서 좋았습니다. 팀 곽생살조 최고입니다!",
            writer: {
                id: 3,
                name: "전민경",
                part: "PM"
            }
        },
        {
            id: 18,
            content:
                "팀원들과 함께 밤을 새우며 정해진 시간 안에 기능을 구현하고 서비스를 완성해 나갔습니다. 개발을 진행하면서 필요한 부분을 계속 이야기하고 조율하며 작업을 이어갔고, 그 과정에서 협업하며 만들어가는 프로젝트의 흐름을 경험할 수 있었습니다.",
            writer: {
                id: 3,
                name: "박조아",
                part: "Front-end"
            }
        },
        {
            id: 19,
            content:
                "좋은 팀원들 덕분에 작업하는 내내 너무 좋았습니다. 남은 재고 공유 서비스였는데 같이 이야기하며 발전해나가는 과정에서 많은 것을 배울 수 있었습니다.곽생살조 영원히 화이팅!",
            writer: {
                id: 3,
                name: "박진아",
                part: "Design"
            }
        },
        {
            id: 20,
            content:
                "지역 시장 활성화를 소주제로 자영업의 공유재고 서비스를 만들어 나가며, 그 안에 어떤 AI를 심어 넣으면 좋을 지 함께 생각해보는 뜻깊은 시간이었습니다. 직접 만든 AI 모델과 함께 구성되는 서비스를 눈으로 직접 보면서 협업의 능력을 키울 수 있었습니다.",
            writer: {
                id: 3,
                name: "조한별",
                part: "AI"
            }
        },
        {
            id: 21,
            content:
                "기획과 개발 전반에서 팀원들과 소통하며 서비스를 완성해가는 과정이 재밌었습니다. 협업 과정에서 효과적인 소통 방식과 팀워크의 중요성을 배우며 함께 성장할 수 있었던 의미 있는 경험이었습니다.",
            writer: {
                id: 3,
                name: "노경인",
                part: "Front-end"
            }
        }
    ],
    205: [
        {
            id: 22,
            content:
                "아이디어톤에서 기획했던 ‘함께 식사하고 싶은 순간을 위한 서비스’를 실제로 구현해 보면서, 짧은 시간 안에 협업을 통해 완성도를 높이는 과정에서 성장할 수 있었습니다. 같은 팀원들과 빠르게 피드백을 주고받고 우선순위를 정해가며, 아이디어를 ‘실제 서비스’로 구현할 수 있는 좋은 경험이었습니다. 밥먹댕 팀원들 고생 많았습니다. 밥먹댕 FOREVER!",
            writer: {
                id: 3,
                name: "김성휘",
                part: "Back-end"
            }
        }
    ]
};
