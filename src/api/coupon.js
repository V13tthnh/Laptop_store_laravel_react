import api from "./api";
const token = localStorage.getItem("token");
export const getAllCoupons = async (id) => {
  try {
    const response = await api.get("/coupons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const getAvailableCoupons = async (data) => {
  try {
    const response = await api.post("/get-available-coupons", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const getApplyCoupon = async (data) => {
  try {
    const response = await api.post("/apply-coupon", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};