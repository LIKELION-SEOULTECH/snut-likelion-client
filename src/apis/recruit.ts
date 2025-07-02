import axiosInstance from "./axiosInstance";

interface SubscribeRequest {
    email: string;
    type: string;
}

export const subscribeRecruitment = ({ email, type }: SubscribeRequest) => {
    const params = new URLSearchParams({ email, type: type }).toString();
    return axiosInstance.post(`/subscriptions?${params}`);
};

// 최신 모집 일정 조회
export const fetchRecentRecruitment = async (type: string) => {
    const response = await axiosInstance.get("/recruitments", {
        params: { recruitmentType: type }
    });
    return response.data;
};
