import api from "../api/api";

export const getProducts = async () => {
    try {
      const response = await api.get('/laptop');
      return response.data;
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      throw error;
    }
  };
  
  export const getProductBySlug = async (slug) => {
    try {
      const response = await api.get(`/laptop/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Có lỗi xảy ra:`, error);
      throw error;
    }
  };