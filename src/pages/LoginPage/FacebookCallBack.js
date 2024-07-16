import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../../components/common/LoadingPage";
import useAuthContext from "../../context/AuthContext";
import { showSuccessAlert } from "../../utils/toastify";
import api from "../../api/api";

export default function FacebookCallback() {
  const { handleSetToken, getUser } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.search) {
          const response = await axios.get(
            `http://localhost:8000/api/auth/callback/facebook${location.search}`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );
          const { token } = response.data;
          localStorage.setItem("token", token);
          handleSetToken(token);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          showSuccessAlert("Bạn vừa đăng nhập bằng tài khoản google.");
          getUser(token);
          setTimeout(() => {
            window.location.href = "/";
          }, 2200);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [location.search, navigate]);

  return (
    <>
      <LoadingPage />
    </>
  );
}
