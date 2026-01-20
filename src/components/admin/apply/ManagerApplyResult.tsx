import type { QNAItem } from "@/types/apply";
import { BasicApplyResult, CommonApplyResult } from "./ApplyResult";

export const ManagerApplyResult = ({ answerList }: { answerList: QNAItem[] }) => {
    return (
        <div>
            <BasicApplyResult />
            <CommonApplyResult />
        </div>
    );
};
