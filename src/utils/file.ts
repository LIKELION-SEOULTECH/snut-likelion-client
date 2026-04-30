export const extractKeyFromUrl = (url: string) => {
    if (!url) return "";
    const idx = url.indexOf("images/");
    return idx !== -1 ? url.substring(idx) : url;
};

const S3_BUCKET_URL = "https://snut-likelion-bucket.s3.ap-northeast-2.amazonaws.com";

export const toPublicFileUrl = (path?: string | null) => {
    if (!path) return "";
    if (/^https?:\/\//.test(path)) return path;

    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

    if (normalizedPath.startsWith("images/") || normalizedPath.startsWith("files/")) {
        return `${S3_BUCKET_URL}/${normalizedPath}`;
    }

    return path;
};
