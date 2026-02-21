import { memberImageMap } from "./memberImage";
import samplePRF from "@/assets/member/samplePRFIMG.png";

export const getProfileImage = (id?: number, profileImageUrl?: string | null) => {
    if (profileImageUrl) return profileImageUrl;

    if (!id) return samplePRF;

    return memberImageMap[String(id)] ?? samplePRF;
};
