import type { RoleCardProps } from "@/types/home";

export const mockCardData: RoleCardProps[] = [
    {
        title: "기획자",
        subtitle: "Planner",
        description1: `프로젝트의 전체 방향을 설계하고, 기능을 정의합니다.
정보 구조(IA), 기능 흐름도, 사용자 플로우 등을 설계합니다.
각 파트가 협업할 수 있도록 기준과 방향을 세웁니다.`,
        description2: `다양한 아이디어를 구조화하고 명확히 설명할 수 있는 능력
협업/커뮤니케이션을 잘하고, 정리하는 걸 좋아하는 사람
Notion, FigJam, Google Docs 등 협업 툴을 활용할 수 있는 사람`,
        description3: `“정답은 없어도 기준은 있어야 한다고 생각하는 사람”
“구현보다 방향이 더 중요하다고 느껴본 사람”`
    },
    {
        title: "디자이너",
        subtitle: "Designer",
        description1: `홈페이지 전체의 톤앤매너, 시각 스타일을 기획합니다.
와이어프레임부터 UI 디자인, 프로토타입까지 제작합니다.
사용자 경험(UX)을 고려한 디자인 설계를 합니다.`,
        description2: `Figma를 활용해 UI를 디자인해본 경험
타이포그래피, 컬러 감각, 사용자 시선 흐름에 대한 이해
기능과 시각을 함께 고민할 줄 아는 균형감각`,
        description3: `“예쁜 것보다 의미 있는 디자인이 좋다는 사람”
“피드백을 듣고, 고민하고, 개선할 수 있는 사람”`
    },
    {
        title: "프론트엔드",
        subtitle: "Front-end",
        description1: `사용자가 직접 마주하는 화면을 개발합니다.
디자인 시안을 실제 웹페이지로 구현합니다.
API 데이터를 불러오고, 반응형 웹을 구성합니다.`,
        description2: `React, Vue 등 프레임워크 경험
HTML, CSS, JS에 대한 이해
협업하면서 구조화된 코드 작성을 지향하는 태도`,
        description3: `“코드로 예술을 만든다고 느끼는 사람”
“UX, 인터랙션을 고민하는 걸 즐기는 사람”`
    },
    {
        title: "백엔드",
        subtitle: "Back-end",
        description1: `서버, 데이터베이스, API 등 홈페이지의 동작 기반을 구축합니다.
사용자 인증, 게시판 기능, 지원서 저장 등 로직을 구현합니다.
프론트와 연결되는 API를 설계하고 문서화합니다.`,
        description2: `Node.js, Express, Python, 또는 다른 백엔드 프레임워크 경험
MongoDB, MySQL 등 DB 설계 경험
RESTful API 구조에 대한 이해`,
        description3: `“보이지 않아도 가장 중요한 걸 만든다는 자부심이 있는 사람”
“복잡한 구조를 깔끔하게 정리하는 걸 좋아하는 사람”`
    },
    {
        title: "인공지능",
        subtitle: "A.I",
        description1: `사용자와 상호작용하는 AI 인터페이스를 개발합니다.
프롬프트 엔지니어링 및 AI-API 연동을 담당합니다.`,
        description2: `OpenAI API 또는 유사한 LLM 기반 API 사용 경험
간단한 백엔드(Flask/FastAPI 등) 연동 경험
창의적이고 논리적인 문제 해결 능력`,
        description3: `“AI를 단순한 도구가 아닌, 경험의 일부로 만들고 싶은 사람”
“프롬프트 한 줄로 무언가 바꾸는 걸 좋아하는 사람”`
    }
];
