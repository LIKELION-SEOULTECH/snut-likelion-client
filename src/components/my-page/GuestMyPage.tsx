import { useNavigate } from "react-router-dom";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";
import { ROUTES } from "@/routes/routes";

export const GuestMyPage = () => {
    const navigate = useNavigate();

    const handleGuestRecruit = async () => {
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

            // 운영진 지원 가능
            if (mOpen <= now && now <= mClose) {
                navigate(ROUTES.RECRUIT_MANAGER);
                return;
            }
            // 멤버 지원 가능 기간
            if (uOpen <= now && now <= uClose) {
                navigate(ROUTES.RECRUIT_MEMBER);
                return;
            }

            // 지원기간이 아닐 때 가장 가까운 모집 일정으로 이동
            const upcoming: Array<{ type: "MANAGER" | "MEMBER"; open: Date }> = [];
            if (mOpen > now) upcoming.push({ type: "MANAGER", open: mOpen });
            if (uOpen > now) upcoming.push({ type: "MEMBER", open: uOpen });

            if (upcoming.length > 0) {
                upcoming.sort((a, b) => a.open.getTime() - b.open.getTime());
                const next = upcoming[0];
                navigate(next.type === "MANAGER" ? ROUTES.RECRUIT_MANAGER : ROUTES.RECRUIT_MEMBER);
                return;
            }
            navigate(ROUTES.RECRUIT_MEMBER);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex justify-between mb-[29px]">
                <h4 className="text-[32px] text-white font-bold">지원서</h4>
                <span
                    className="text-[20px] text-[#7F7F7F] cursor-pointer text-[#f70]"
                    onClick={handleGuestRecruit}
                >
                    지원서 작성하기
                </span>
            </div>
            <div className="bg-[#404040] h-[98px] py-[35px] px-[40px] cursor-pointer text-[24px] rounded-[12px] text-[#7F7F7F]">
                아직 작성한 지원서가 없습니다.
            </div>
        </div>
    );
};
