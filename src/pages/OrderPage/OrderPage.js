import { useNavigate } from "react-router-dom";
import Orders from "../../components/customer/Orders";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import { showFailedAlert } from "../../utils/toastify";
import { useEffect } from "react";
import useAuthContext from "../../context/AuthContext";

export default function OrderPage() {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        showFailedAlert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }, 1200);
      return;
    }
  }, [token]);
  return (
    <>
      <Header />
      <Orders />
      <Footer />
    </>
  );
}
