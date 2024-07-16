import api from "./api";
const token = localStorage.getItem('token');
export const changePassword = async (passwordObj) => {
  try {
    const response = await api.post("/change-password", passwordObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

export const updateProfile = async (profileObj) => {
  try {
    const response = await api.post("update-profile", profileObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};
