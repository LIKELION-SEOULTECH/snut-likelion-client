import type { GetQuestionsParameter, QuestionListResponse } from "@/types/recruitment-form";
import axiosInstance from "../axiosInstance";
import type {
    MyApplicationsResponse,
    QuestionResponse,
    SubscribeRequest
} from "@/types/recruitment";

// 최신 모집일정 조회
export const fetchRecentRecruitment = async (recruitmentType: string) => {
    const res = await axiosInstance.get("/recruitments", {
        params: { recruitmentType }
    });
    return res.data;
};

// 모집 알림 이메일 등록
export const subscribeRecruitment = ({ email, type }: SubscribeRequest) => {
    const params = new URLSearchParams({ email, type: type }).toString();
    return axiosInstance.post(`/subscriptions?${params}`);
};

// 내 지원서 목록 조회
export const fetchMyApplications = async (): Promise<MyApplicationsResponse[]> => {
    const res = await axiosInstance.get("/applications/me");
    console.log(res);
    return res.data.data;
};

// 내가 선택한 일정에 해당하는 질문 리스트 조회
export const fetchQuestions = async (
    recId: number,
    params: GetQuestionsParameter
): Promise<QuestionResponse[]> => {
    const res = await axiosInstance.get<QuestionListResponse>(`/recruitments/${recId}/questions`, {
        params
    });
    return res.data.data;
};

// 지원서 작성 (임시 저장된 지원서가 없는 경우)
type CreateApplicationRequest = {
    major: string;
    studentId: string;
    grade: number;
    inSchool: boolean;
    answers: { questionId: number; answer: string }[];
    isPersonalInfoConsent: boolean;
    portfolio?: File | null;
    part: string;
    departmentType?: string;
};
export const postApplication = async (
    recId: number,
    submit: boolean,
    payload: CreateApplicationRequest
) => {
    const form = new FormData();

    form.append(`major`, payload.major ?? "");
    form.append(`studentId`, payload.studentId ?? "");
    form.append(`grade`, String(payload.grade ?? 1));
    form.append(`inSchool`, String(!!payload.inSchool));
    form.append(`isPersonalInfoConsent`, "true");
    form.append(`part`, payload.part);

    if (payload.departmentType) {
        form.append(`departmentType`, payload.departmentType);
    }

    payload.answers.forEach((a: { questionId: number; answer: string }, i) => {
        form.append(`answers[${i}].questionId`, String(a.questionId));
        form.append(`answers[${i}].answer`, a.answer);
    });

    if (payload.portfolio) {
        form.append(`portfolio`, payload.portfolio);
    }

    const res = await axiosInstance.post(`/recruitments/${recId}/applications`, form, {
        params: { submit },
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
};

// 지원서 수정 (임시 저장된 지원서가 있는 경우)

// 지원서 삭제
