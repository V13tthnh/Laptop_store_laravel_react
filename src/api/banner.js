import api from "./api";

export const getBanners = async () => {
  try {
    const response = await api.get(`/banners`);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};
