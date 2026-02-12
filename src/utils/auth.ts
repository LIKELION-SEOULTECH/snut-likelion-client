export const getRoleFromToken = (): string | null => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.role ?? null;
    } catch (err) {
        console.error("토큰 decode 실패", err);
        return null;
    }
};
