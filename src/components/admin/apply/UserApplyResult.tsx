import type { ApplicationDetail } from "@/types/recruitment";
import { ApplyResult } from "./ApplyResult";

export const UserApplyResult = ({
    applicationDetail,
    portfolio
}: {
    applicationDetail: ApplicationDetail;
    portfolio: string;
}) => {
    const { answers } = applicationDetail;

    return (
        <div>
            <ApplyResult answers={answers} portfolio={portfolio} />
        </div>
    );
};
