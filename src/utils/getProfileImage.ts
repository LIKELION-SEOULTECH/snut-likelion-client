export const getProfileImage = (id?: number, profileImageUrl?: string | null) => {
    // 서버 이미지 있으면 그거 우선
    if (profileImageUrl) return profileImageUrl;

    if (!id) return new URL("../assets/Member/samplePRFIMG.png", import.meta.url).href;

    try {
        return new URL(`../assets/member/profile/${id}.png`, import.meta.url).href;
    } catch {
        return new URL("../assets/Member/samplePRFIMG.png", import.meta.url).href;
    }
};
