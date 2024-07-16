import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { showFailedAlert, showSuccessAlert } from "../utils/toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      getUser(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      getUser(storedToken);
    }
  }, [token]);

  const handleSetToken = async (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await getUser(token);
    navigate("/");
  };

  const getUser = async (token) => {
    try {
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const login = async ({ ...data }) => {
    try {
      const response = await api.post("/login", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUser(token);
      if (response.data.status) {
        showSuccessAlert("Đăng nhập thành công.");
        setErrors(null);
        setTimeout(() => {
          window.location.href = "/";
        }, 1300);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        showFailedAlert(error.response.data.message);
      }
    }
  };

  const redirect = async (provider) => {
    try {
      const response = await api.get(`/auth/redirect/${provider}`);
      const { url } = response.data;

      if (url) {
        window.location.href = url;
      } else {
        showFailedAlert("Không thể chuyển hướng đến dịch vụ đăng nhập.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        showFailedAlert(error.response.data.message);
      }
    }
  };

  const callback = async ({ provider, location }) => {
    try {
      await api.get(`auth/callback/${provider}?${location}`);
      const query = new URLSearchParams(location.search);
      const token = query.get("code");
      localStorage.setItem("code", token);
      setToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUser(token);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        showFailedAlert(error.response.data.message);
      }
    }
  };

  const register = async ({ ...data }) => {
    try {
      const response = await api.post("/register", data);
      if (response.data.status) {
        setErrors(null);
        showSuccessAlert("Đăng ký tài khoản thành công.");
        setTimeout(() => navigate("/login"), 1300);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        showFailedAlert(error.response.data.message);
      }
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common["Authorization"];
      showSuccessAlert("Đã đăng xuất.");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        showFailedAlert(error.response.data.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        errors,
        register,
        login,
        getUser,
        logout,
        redirect,
        callback,
        handleSetToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
