import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";
import useAuthContext from "../../context/AuthContext";

export default function FacebookCallback() {
  const { handleSetToken } = useAuthContext();
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
          navigate("/");
          toast.success("Đăng nhập thành công.");
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
