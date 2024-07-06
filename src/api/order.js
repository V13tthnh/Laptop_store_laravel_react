import api from "./api";

export const getAllOrders = async (user_id) => {
  try {
    const response = await api.get("/get-orders", user_id);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

