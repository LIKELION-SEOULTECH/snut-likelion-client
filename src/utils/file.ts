export const extractKeyFromUrl = (url: string) => {
    if (!url) return "";
    const idx = url.indexOf("images/");
    return idx !== -1 ? url.substring(idx) : url;
};
