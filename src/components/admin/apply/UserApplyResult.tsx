import type { ApplicationDetail } from "@/types/recruitment";
import { BasicApplyResult, CommonApplyResult } from "./ApplyResult";

export const UserApplyResult = ({
    applicationDetail
}: {
    applicationDetail: ApplicationDetail;
}) => {
    const { answers, ...basicInfo } = applicationDetail;

    return (
        <div>
            <BasicApplyResult applicationDetail={basicInfo} />
            <CommonApplyResult answers={answers} />
        </div>
    );
};
