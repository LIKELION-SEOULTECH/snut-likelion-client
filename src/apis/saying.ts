import axiosInstance from "./axiosInstance";

export const fetchSaying = async () => {
    const response = await axiosInstance.get("/sayings");
    return response.data.data.data;
};
