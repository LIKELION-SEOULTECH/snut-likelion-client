import { useEffect, useState } from "react";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";
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
import { fetchQuestionsByRecruitment } from "@/apis/admin/recruitment";

export const ManagerApplyForm = () => {
    const [recId, setRecId] = useState<number | null>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecentRecruitment("MANAGER");
                console.log("최근 모집 정보:", data.data);
                console.log("최근 모집 정보:", data.data.id);
                setRecId(Number(data.data.id));
            } catch (err) {
                console.error("모집 정보 가져오기 실패", err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!recId) return;

        const fetchQuestions = async () => {
            try {
                const data = await fetchQuestionsByRecruitment(recId);
                console.log("모든 질문 조회 결과:", data);
            } catch (err) {
                console.error("질문 조회 실패", err);
            }
        };

        fetchQuestions();
    }, [recId]);

    return (
        <div className="flex flex-col mb-50">
            {recId !== null && (
                <>
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
                </>
            )}
        </div>
    );
};

// 멤버 지원서
export const UserApplyForm = () => {
    const [recId, setRecId] = useState<number | null>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecentRecruitment("MEMBER");
                console.log("최근 모집 정보:", data.data);
                setRecId(Number(data.data.id));
            } catch (err) {
                console.error("모집 정보 가져오기 실패", err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!recId) return;

        const fetchQuestions = async () => {
            try {
                const data = await fetchQuestionsByRecruitment(recId);
                console.log("모든 질문 조회 결과:", data);
            } catch (err) {
                console.error("질문 조회 실패", err);
            }
        };

        fetchQuestions();
    }, [recId]);

    return (
        <div className="flex flex-col mb-50">
            {recId !== null && (
                <>
                    <BasicQuestionList />
                    <CommonQuestionList />
                    <PlanQuestionList />
                    <DesignQuestionList />
                    <FrontendQuestionList />
                    <BackendQuestionList />
                    <AIQuestionList />
                </>
            )}
        </div>
    );
};
