import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/routes/routes";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";

type RecruitTarget = "MANAGER" | "MEMBER";

export const useGuestRecruitNavigation = () => {
    const navigate = useNavigate();

    const goRecruitForm = useCallback(
        async (fallback: RecruitTarget = "MEMBER") => {
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

                //1) 지금 열려있는 모집이 있으면 그 폼으로
                if (mOpen <= now && now <= mClose) {
                    navigate(ROUTES.RECRUIT_MANAGER, { state: { recId: managerRes.data.id } });
                    return;
                }
                if (uOpen <= now && now <= uClose) {
                    navigate(ROUTES.RECRUIT_MEMBER, { state: { recId: memberRes.data.id } });
                    return;
                }

                // 2) 없으면 가장 가까운 openDate로
                const upcoming: Array<{ type: RecruitTarget; open: Date; recId: number }> = [];
                if (mOpen > now)
                    upcoming.push({ type: "MANAGER", open: mOpen, recId: managerRes.data.id });
                if (uOpen > now)
                    upcoming.push({ type: "MEMBER", open: uOpen, recId: memberRes.data.id });

                if (upcoming.length > 0) {
                    upcoming.sort((a, b) => a.open.getTime() - b.open.getTime());
                    const next = upcoming[0];

                    navigate(
                        next.type === "MANAGER" ? ROUTES.RECRUIT_MANAGER : ROUTES.RECRUIT_MEMBER,
                        { state: { recId: next.recId } }
                    );
                    return;
                }

                // 3) 둘 다 과거면
                navigate(fallback === "MANAGER" ? ROUTES.RECRUIT_MANAGER : ROUTES.RECRUIT_MEMBER, {
                    state: {
                        recId: fallback === "MANAGER" ? managerRes.data.id : memberRes.data.id
                    }
                });
            } catch (err) {
                console.error(err);
                // 에러 났을 때도 일단 멤버 폼으로
                navigate(ROUTES.RECRUIT_MEMBER);
            }
        },
        [navigate]
    );

    return { goRecruitForm };
};
