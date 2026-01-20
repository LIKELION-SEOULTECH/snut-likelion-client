import { useEffect, useState, useRef } from "react";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";
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
import { fetchQuestionsByRecruitment } from "@/apis/admin/recruitment";

export const ManagerApplyForm = ({ onSave }: { onSave?: (saveFns: (() => void)[]) => void }) => {
    const [recId, setRecId] = useState<number | null>(null);
    const saveFns = useRef<(() => void)[]>([]);

    const handleRegisterSaveFn = (fn: () => void) => {
        saveFns.current.push(fn);
    };

    useEffect(() => {
        if (onSave) {
            onSave(saveFns.current);
        }
    }, [recId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecentRecruitment("MANAGER");
                console.log("최근 모집 정보:", data.data);
                console.log("최근 모집 정보:", data.data.id);
                setRecId(Number(data.data.id)); // 이 부분만 수정하면 대부분 해결됨
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
                    <BasicQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <CommonQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <PlanQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <DesignQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <FrontendQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <BackendQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <AIQuestionList recId={recId} onSave={handleRegisterSaveFn} />

                    <div className="flex flex-col mt-10">
                        <div className="text-2xl font-bold mb-10">운영진 질문</div>
                        <OpsQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                        <PRQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                        <AcademicsQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    </div>
                </>
            )}
        </div>
    );
};

// 멤버 지원서
export const UserApplyForm = ({ onSave }: { onSave?: (saveFns: (() => void)[]) => void }) => {
    const [recId, setRecId] = useState<number | null>(null);
    const saveFns = useRef<(() => void)[]>([]);

    const handleRegisterSaveFn = (fn: () => void) => {
        saveFns.current.push(fn);
    };

    useEffect(() => {
        if (onSave) {
            onSave(saveFns.current);
        }
    }, [recId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecentRecruitment("MEMBER");
                console.log("최근 모집 정보:", data.data);
                console.log("최근 모집 정보:", data.data.id);
                setRecId(Number(data.data.id)); // 이 부분만 수정하면 대부분 해결됨
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
                    <BasicQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <CommonQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <PlanQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <DesignQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <FrontendQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <BackendQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                    <AIQuestionList recId={recId} onSave={handleRegisterSaveFn} />
                </>
            )}
        </div>
    );
};
