import api from "./api";

export const getAllProducts = async () => {
  try {
    const response = await api.get("/laptops");
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

export const getRelatedProducts = async (product_id) => {
  try {
    const response = await api.post("/related-laptops", product_id);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};
