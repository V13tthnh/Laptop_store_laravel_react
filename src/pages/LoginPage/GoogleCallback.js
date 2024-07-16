import { useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";
import api from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/common/LoadingPage";
import { toast } from "react-toastify";
import axios from "axios";
import { showSuccessAlert } from "../../utils/toastify";

export default function GoogleCallback() {
  const { handleSetToken, getUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.search) {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:8000/api/auth/callback/google${location.search}`,
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
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [handleSetToken, location.search, navigate]);

  if (loading) {
    return <LoadingPage />;
  }
}
