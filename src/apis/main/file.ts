import axios from "axios";
import axiosInstance from "../axiosInstance";

type UploadCategory = "BLOG" | "MEMBER" | "PROJECT" | "NOTICE";

// presigned url 발급
export const getPresignedUrl = async (file: File, category: UploadCategory) => {
    const res = await axiosInstance.post("/admin/files/presigned-url", {
        originalFileName: file.name,
        contentType: file.type,
        contentLength: file.size,
        uploadCategory: category,
        fileStorageType: "IMAGE"
    });

    console.log("📌 presigned:", category, res.data.data);

    return res.data.data;
};

// 파일 s3로 업로드
export const uploadToS3 = async (
    uploadUrl: string,
    file: File,
    headers: Record<string, string>
) => {
    console.log("📌 S3 업로드:", uploadUrl);

    await axios.put(uploadUrl, file, {
        headers: {
            "Content-Type": file.type,
            ...headers
        }
    });

    console.log("✅ S3 업로드 완료");
};

type UploadCompleteRequest = {
    storedFileName: string;
    originalFileName: string;
    contentType: string;
    contentLength: number;
};

export const uploadComplete = async (data: UploadCompleteRequest, category: UploadCategory) => {
    const res = await axiosInstance.post("/admin/files/upload-complete", {
        ...data,
        uploadCategory: category
    });

    console.log("📌 uploadComplete:", category, res.data.data);

    return res.data.data;
};

// 단일 이미지 업로드 (멤버)
export const uploadImage = async (
    file: File,
    category: UploadCategory
): Promise<{ storedName: string; fileUrl: string }> => {
    const { uploadUrl, headers, storedFileName } = await getPresignedUrl(file, category);

    await uploadToS3(uploadUrl, file, headers);

    const result = await uploadComplete(
        {
            storedFileName,
            originalFileName: file.name,
            contentType: file.type,
            contentLength: file.size
        },
        category
    );

    return {
        storedName: result.storedFileName,
        fileUrl: result.fileUrl
    };
};

// 이미지 여러개 업로드 (블로그, 프로젝트, 소식)
export const uploadImages = async (
    files: File[],
    category: UploadCategory
): Promise<{ storedNames: string[]; fileUrls: string[] }> => {
    const storedNames: string[] = [];
    const fileUrls: string[] = [];

    for (const file of files) {
        const { storedName, fileUrl } = await uploadImage(file, category);

        storedNames.push(storedName);
        fileUrls.push(fileUrl);
    }

    return { storedNames, fileUrls };
};
