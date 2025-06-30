import axiosInstance from "./axiosInstace";

// 타입 정의 예시 (필요에 따라 import 또는 정의)
export interface UpdateProfileRequest {
    name?: string;
    phoneNumber?: string;
    email?: string;
}

export interface MemberQueryParams {
    generation?: number;
    role?: string;
}

// ✅ 기수 및 역할별 멤버 조회
export const fetchMembers = (params?: MemberQueryParams) => {
    return axiosInstance.get("/members", { params });
};

// ✅ 내 정보 상세 조회 (아기사자 이상 권한 필요)
export const fetchMyInfo = () => {
    return axiosInstance.get("/members/me");
};

// ✅ 특정 멤버 상세 조회
export const fetchMemberDetail = (memberId: number) => {
    return axiosInstance.get(`/members/${memberId}`);
};

// ✅ 유저 정보 수정
export const updateMemberInfo = (memberId: number, data: UpdateProfileRequest) => {
    return axiosInstance.patch(`/members/${memberId}`, data);
};

// ✅ 멤버 멋사 활동 정보 조회
export const fetchMemberLionInfo = (memberId: number, generation: number) => {
    return axiosInstance.get(`/members/${memberId}/lion-info`, {
        params: { generation }
    });
};

// ✅ 멤버 검색 (키워드)
export const searchMembers = (keyword: string) => {
    return axiosInstance.get("/members/search", {
        params: { keyword }
    });
};

// ✅ 회원 탈퇴
export const deleteMember = (memberId: number) => {
    return axiosInstance.delete(`/api/v1/members/${memberId}`);
};
