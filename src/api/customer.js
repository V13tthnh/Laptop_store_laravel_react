import api from "./api";

export const changePassword = async (passwordObj) => {
  try {
    const response = await api.post("/change-password", passwordObj);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

export const updateProfile = async (profileObj) => {
  try {
    const response = await api.post("update-profile", profileObj);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};
