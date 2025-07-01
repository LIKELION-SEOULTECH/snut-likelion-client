import { BasicQuestionList } from "./BasicQuestionList";
import { CommonQuestionList } from "./CommonQuestionList";
import { AcademicsQuestionList, OpsQuestionList, PRQuestionList } from "./DepartmentQuestionList";
import {
    AIQuestionList,
    BackendQuestionList,
    DesignQuestionList,
    FrontendQuestionList,
    PlanQuestionList
} from "./PartQuestionList";

export const ManagerApplyForm = () => {
    return (
        <div className="flex flex-col mb-50">
            <BasicQuestionList />
            <CommonQuestionList />
            <PlanQuestionList />
            <DesignQuestionList />
            <FrontendQuestionList />
            <BackendQuestionList />
            <AIQuestionList />
            <div className="flex flex-col mt-10">
                <div className="text-2xl font-bold mb-10">운영진 질문</div>
                <OpsQuestionList />
                <PRQuestionList />
                <AcademicsQuestionList />
            </div>
        </div>
    );
};

export const UserApplyForm = () => {
    return (
        <div className="flex flex-col mb-50">
            <BasicQuestionList />
            <CommonQuestionList />
            <PlanQuestionList />
            <DesignQuestionList />
            <FrontendQuestionList />
            <BackendQuestionList />
            <AIQuestionList />
        </div>
    );
};
