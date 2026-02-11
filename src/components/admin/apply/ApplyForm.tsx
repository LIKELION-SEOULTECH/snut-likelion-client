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
import {
    createDepartmentInitialQuestions,
    createPartInitialQuestions
} from "@/constants/admin/initialQuestion";
import {
    mapServerToApiDepartmentType,
    mapServerToApiQuestionPart,
    mapServerToApiQuestionTarget,
    mapServerToApiQuestionType
} from "@/utils/questionTargetMapper";
import type { Question } from "@/types/apply";

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

    const normalizedQuestions = recruitmentQuestions?.data.map((q: Question) => ({
        ...q,
        questionTarget: mapServerToApiQuestionTarget(q.questionTarget),
        questionType: mapServerToApiQuestionType(q.questionType),
        part: mapServerToApiQuestionPart(q.part),
        departmentType: mapServerToApiDepartmentType(q.departmentType)
    }));

    useEffect(() => {
        if (!recruitmentQuestions?.data) return;

        console.log(normalizedQuestions);
        const { basic, common, partMap, departmentMap } = splitQuestions(normalizedQuestions);

        setBasicQuestionList(basic);
        setCommonQuestionList(common);

        // 파트 질문
        setPlanQuestionList(partMap.PLANNING ?? createPartInitialQuestions("PLANNING"));
        setDesignQuestionList(partMap.DESIGN ?? createPartInitialQuestions("DESIGN"));
        setFrontendQuestionList(partMap.FRONTEND ?? createPartInitialQuestions("FRONTEND"));
        setBackendQuestionList(partMap.BACKEND ?? createPartInitialQuestions("BACKEND"));
        setAiQuestionList(partMap.AI ?? createPartInitialQuestions("AI"));

        // 부서 질문
        setOperationQuestionList(
            departmentMap.OPERATION ?? createDepartmentInitialQuestions("OPERATION")
        );
        setMarketingQuestionList(
            departmentMap.MARKETING ?? createDepartmentInitialQuestions("MARKETING")
        );
        setAcademicQuestionList(
            departmentMap.ACADEMIC ?? createDepartmentInitialQuestions("ACADEMIC")
        );
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

    const normalizedQuestions = recruitmentQuestions?.data.map((q: Question) => ({
        ...q,
        questionTarget: mapServerToApiQuestionTarget(q.questionTarget)
    }));
    useEffect(() => {
        if (!recruitmentQuestions?.data) return;

        const { basic, common, partMap } = splitQuestions(normalizedQuestions);

        setBasicQuestionList(basic);
        setCommonQuestionList(common);

        setPlanQuestionList(partMap.기획 ?? createPartInitialQuestions("PLANNING"));
        setDesignQuestionList(partMap.디자인 ?? createPartInitialQuestions("DESIGN"));
        setFrontendQuestionList(partMap.프론트엔드 ?? createPartInitialQuestions("FRONTEND"));
        setBackendQuestionList(partMap.백엔드 ?? createPartInitialQuestions("BACKEND"));
        setAiQuestionList(partMap.AI ?? createPartInitialQuestions("AI"));
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
