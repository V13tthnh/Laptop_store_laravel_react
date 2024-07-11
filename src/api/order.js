import api from "./api";

export const getOrders = async (user_id) => {
  try {
    const response = await api.post("/get-orders", user_id);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

export const getOrderDetail = async (order_id) => {
  try {
    const response = await api.post("/get-order-detail", order_id);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

export const getOrdersByStatus = async (order_id) => {
  try {
    const response = await api.post("/get-order-detail", order_id);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

export const cancelOrder = async (order_id) => {
  try {
    const response = await api.post("/cancel-order", order_id);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

export const reOrder = async (order_id) => {
  try {
    const response = await api.post("/re-order", order_id);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};