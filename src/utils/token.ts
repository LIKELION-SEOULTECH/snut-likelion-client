// 토큰 로컬 스토리지 저장 함수

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const setAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (token: string) => {
    localStorage.setItem("refreshToken", token);
};

export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};
