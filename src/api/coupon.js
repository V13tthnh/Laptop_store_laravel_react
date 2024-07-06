import api from "./api";

export const getAllCoupons = async (id) => {
  try {
    const response = await api.get("/coupons");
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const getAvailableCoupons = async (data) => {
  try {
    const response = await api.post("/get-available-coupons", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};
