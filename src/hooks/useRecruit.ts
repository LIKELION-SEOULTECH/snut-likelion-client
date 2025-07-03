import { fetchRecentRecruitment } from "@/apis/recruit";
import { ROUTES } from "@/constants/routes";

export const handleGuestRecruit = async (): Promise<string> => {
    try {
        const [memberRes, managerRes] = await Promise.all([
            fetchRecentRecruitment("MEMBER"),
            fetchRecentRecruitment("MANAGER")
        ]);

        const now = new Date();
        const mOpen = new Date(managerRes.data.openDate);
        const mClose = new Date(managerRes.data.closeDate);
        const uOpen = new Date(memberRes.data.openDate);
        const uClose = new Date(memberRes.data.closeDate);

        // 기간
        console.log(
            `[운영진] ${managerRes.data.generation}기 → open: ${mOpen.toLocaleString()}, close: ${mClose.toLocaleString()}`
        );
        console.log(
            `[멤버]     ${memberRes.data.generation}기 → open: ${uOpen.toLocaleString()}, close: ${uClose.toLocaleString()}`
        );

        // 운영진 지원 가능
        if (mOpen <= now && now <= mClose) {
            return ROUTES.RECRUIT_MANAGER;
        }
        // 멤버 지원 가능 기간
        if (uOpen <= now && now <= uClose) {
            return ROUTES.RECRUIT_MEMBER;
        }

        // 지원기간 ㄴㄴ
        const upcoming: Array<{ type: "MANAGER" | "MEMBER"; open: Date }> = [];
        if (mOpen > now) upcoming.push({ type: "MANAGER", open: mOpen });
        if (uOpen > now) upcoming.push({ type: "MEMBER", open: uOpen });

        if (upcoming.length > 0) {
            // openDate 기준  → 가장 가까운 기간에 모집인곳
            upcoming.sort((a, b) => a.open.getTime() - b.open.getTime());
            const next = upcoming[0];
            if (next.type === "MANAGER") {
                return ROUTES.RECRUIT_MANAGER;
            } else {
                return ROUTES.RECRUIT_MEMBER;
            }
            return;
        }
        return ROUTES.RECRUIT_MEMBER;
    } catch (err) {
        console.error(err);
    }
};
