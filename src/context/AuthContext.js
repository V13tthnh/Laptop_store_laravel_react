import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      getUser(storedToken);
    }
  }, []);

  const getUser = async (token) => {
    try {
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response.data.message);
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
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const redirect = async (provider) => {
    try {
      const response = await api.get(`auth/redirect/${provider}`);
      window.location.href = response.data.url;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const callback = async ({provider, location}) => {
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
        toast.error(error.response.data.message);
      }
    }
  };

  const register = async ({ ...data }) => {
    try {
      const response = await api.post("/register", data);
      if (response.data.status) {
        toast.success("Đăng ký thành công.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    toast.success("Đã đăng xuất.");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
