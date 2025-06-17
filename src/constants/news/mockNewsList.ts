// 공지 데이터 3개
const mockNoticeList = [
    {
        id: 1,
        type: "공지",
        title: "2025 중앙 해커톤 일정 안내",
        date: "2025.09.30"
    },
    {
        id: 2,
        type: "공지",
        title: "멋사 서울과기대 2학기 모집",
        date: "2025.09.28"
    },
    {
        id: 3,
        type: "공지",
        title: "세션 발표자 사전 안내",
        date: "2025.09.04"
    }
];

// 일반 뉴스 50개
const mockGeneralNewsList = Array.from({ length: 50 }, (_, i) => ({
    id: i + 4,
    type: "일반",
    title: "무슨 공지가 올라갈까나...?",
    date: `2025.09.${((i % 30) + 4).toString().padStart(2, "0")}`
}));

// 공지 + 일반 통합 후 날짜 기준 정렬
const combinedList = [...mockNoticeList, ...mockGeneralNewsList]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((item, index) => ({
        ...item,
        isNew: index < 3 // 상위 3개에만 isNew: true
    }));

// 공지는 다시 위로 올리고, 나머지는 아래
const mockNewsList = [
    ...combinedList.filter((item) => item.type === "공지"),
    ...combinedList.filter((item) => item.type !== "공지")
];

export { mockNewsList };
