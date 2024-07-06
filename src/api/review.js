import api from "./api";

export const storeReview = async (data) => {
  try {
    const response = await api.post('/store-review', data);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const getTotalReviewOfProduct = async (product_id) => {
  try {
    const response = await api.post('/get-total-reviews-of-product', product_id);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const fetchReviewOfProduct = async (product_id) => {
  try {
    const response = await api.post('/fetch-reviews-of-product', product_id);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};
