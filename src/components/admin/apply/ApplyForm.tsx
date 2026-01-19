import { useQuery } from "@tanstack/react-query";
import { BasicQuestionList } from "./BasicQuestionList";
import { CommonQuestionList } from "./CommonQuestionList";
import {
    AcademicsQuestionList,
    OperationQuestionList,
    MarketingQuestionList
} from "./DepartmentQuestionList";
import {
    AIQuestionList,
    BackendQuestionList,
    DesignQuestionList,
    FrontendQuestionList,
    PlanQuestionList
} from "./PartQuestionList";
import { useEffect } from "react";
import { splitQuestions } from "@/utils/splitQuestions";
import { fetchQuestionsByRecruitment } from "@/apis/admin/recruitment";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
import { initialQuestions } from "@/constants/admin/initialQuestion";

export const ManagerApplyForm = ({ recId }: { recId: number }) => {
    const {
        setBasicQuestionList,
        setCommonQuestionList,
        setPlanQuestionList,
        setDesignQuestionList,
        setFrontendQuestionList,
        setBackendQuestionList,
        setAiQuestionList,
        setOperationQuestionList,
        setMarketingQuestionList,
        setAcademicQuestionList
    } = useQuestionListsStore();

    const { data: recruitmentQuestions } = useQuery({
        queryKey: ["recruitment-questions", recId],
        queryFn: () => fetchQuestionsByRecruitment(recId),
        enabled: !!recId
    });

    useEffect(() => {
        if (!recruitmentQuestions?.data) return;

        const { basic, common, partMap, departmentMap } = splitQuestions(recruitmentQuestions.data);

        setBasicQuestionList(basic);
        setCommonQuestionList(common);

        setPlanQuestionList(partMap.기 ?? initialQuestions);
        setDesignQuestionList(partMap.디자인 ?? initialQuestions);
        setFrontendQuestionList(partMap.프론트엔드 ?? initialQuestions);
        setBackendQuestionList(partMap.백엔드 ?? initialQuestions);
        setAiQuestionList(partMap.AI ?? initialQuestions);
        setOperationQuestionList(partMap.운영부 ?? initialQuestions);
        setMarketingQuestionList(partMap.홍보부 ?? initialQuestions);
        setAcademicQuestionList(departmentMap.학술부 ?? initialQuestions);
    }, [recruitmentQuestions]);

    return (
        <div className="flex flex-col mb-50">
            <div>
                <BasicQuestionList />
                <CommonQuestionList />
                <PlanQuestionList />
                <DesignQuestionList />
                <FrontendQuestionList />
                <BackendQuestionList />
                <AIQuestionList />

                <div className="flex flex-col mt-10">
                    <div className="text-2xl font-bold mb-10">운영진 질문</div>
                    <OperationQuestionList />
                    <MarketingQuestionList />
                    <AcademicsQuestionList />
                </div>
            </div>
        </div>
    );
};

// 멤버 지원서
export const UserApplyForm = ({ recId }: { recId: number }) => {
    const {
        setBasicQuestionList,
        setCommonQuestionList,
        setPlanQuestionList,
        setDesignQuestionList,
        setFrontendQuestionList,
        setBackendQuestionList,
        setAiQuestionList
    } = useQuestionListsStore();

    const { data: recruitmentQuestions } = useQuery({
        queryKey: ["recruitment-questions", recId],
        queryFn: () => fetchQuestionsByRecruitment(recId),
        enabled: !!recId
    });

    useEffect(() => {
        if (!recruitmentQuestions?.data) return;

        const { basic, common, partMap } = splitQuestions(recruitmentQuestions.data);

        setBasicQuestionList(basic);
        setCommonQuestionList(common);

        setPlanQuestionList(partMap.기획 ?? initialQuestions);
        setDesignQuestionList(partMap.디자인 ?? initialQuestions);
        setFrontendQuestionList(partMap.프론트엔드 ?? initialQuestions);
        setBackendQuestionList(partMap.백엔드 ?? initialQuestions);
        setAiQuestionList(partMap.AI ?? initialQuestions);
    }, [recruitmentQuestions]);

    return (
        <div className="flex flex-col mb-50">
            <div>
                <BasicQuestionList />
                <CommonQuestionList />
                <PlanQuestionList />
                <DesignQuestionList />
                <FrontendQuestionList />
                <BackendQuestionList />
                <AIQuestionList />
            </div>
        </div>
    );
};
