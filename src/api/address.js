import api from "./api";
const token = localStorage.getItem('token');

export const getAllAddresses = async (id) => {
  try {
    const response = await api.get(`/addresses/${id}/all`, {
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


export const getAddresses = async (id) => {
  try {
    const response = await api.get(`/addresses/${id}`, {
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

export const getDefaultAddress = async (id) => {
  try {
    const response = await api.get(`/address/${id}/default`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }
};

export const getProvinces = async () => {
    try {
      const response = await api.get("/provinces", {
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

export const getDistrictsByProvinceId = async (provinceId) => {
  try {
    const response = await api.get(`/provinces/${provinceId}/districts`, {
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

export const getWardsByDistrictsId = async (districtId) => {
  try {
    const response = await api.get(`/districts/${districtId}/wards`, {
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

export const createAddress = async (address) => {
  try {
    const response = await api.post("/addresses", address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.message;
  } catch (error) {
    console.error("Error creating address:", error);
    throw error;
  }
};

export const updateAddress = async (id, address) => {
  try {
    const response = await api.put(`/addresses/${id}`, address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.message;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await api.delete(`/addresses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.message;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};

export const setDefaultAddress = async (id, address_id) => {
  try {
    const response = await api.post(`/address/${id}/set-default`, address_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.message;
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }

};

export const getProvinceType = async (id) => {
  try {
    const response = await api.post(`/address/${id}/province-type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }
};
