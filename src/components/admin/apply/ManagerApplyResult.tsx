import type { ApplicationDetail } from "@/types/recruitment";
import { ApplyResult } from "./ApplyResult";

export const ManagerApplyResult = ({
    applicationDetail
}: {
    applicationDetail: ApplicationDetail;
}) => {
    const { answers } = applicationDetail;

    return (
        <div>
            <ApplyResult answers={answers} />
        </div>
    );
};
