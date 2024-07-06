import { useEffect, useState } from "react";
import axios from "axios";
import useAuthContext from "../../context/AuthContext";
import api from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/common/LoadingPage";
import { toast } from "react-toastify";

export default function GoogleCallback() {
  const { callback, user, errors, getUser } = useAuthContext();
  const [googleToken, setGoogleToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.search) {
          // setLoading(true);
          // const response = await api.get(
          //   `/auth/callback/google${location.search}`
          // );
          // getUser(response.data.token);
          // console.log(response);
          // setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
      
    };
    fetchData();
  }, [errors, callback, location.search]);

  if (loading) {
    return <LoadingPage />;
  }

  if (user) {
    navigator("/");
    toast.success("Đăng nhập thành công");
  }
}
