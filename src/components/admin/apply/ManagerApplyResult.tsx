// import type { QNAItem } from "@/types/apply";
import { BasicApplyResult, CommonApplyResult } from "./ApplyResult";

export const ManagerApplyResult = () => {
    return (
        <div>
            <BasicApplyResult />
            <CommonApplyResult />
        </div>
    );
};
