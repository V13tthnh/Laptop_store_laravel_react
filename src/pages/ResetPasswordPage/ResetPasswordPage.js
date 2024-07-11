import { useEffect, useRef, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../../pages/RegisterPage/RegisterPage.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();
  const { token } = useParams();
  const newPassword = useRef();
  const newPasswordConfirmation = useRef();
  const navigator = useNavigate();
  console.log(errors);
  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!newPassword.current.value || !newPasswordConfirmation.current.value) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      const response = await api.post("/reset-password", {
        new_password: newPassword.current.value,
        new_password_confirmation: newPasswordConfirmation.current.value,
        token: token,
      });
      setLoading(true);
      if (response.data.status) {
        toast.success(response.data.message);
        setLoading(false);
        setTimeout(() => {
          navigator("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  if (loading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div class="container forms">
        <div className="form show-signup">
          <div className="form-content">
            <header className="form-header">Đổi mật khẩu</header>
            <form action="#" className="show-signup">
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="password"
                  ref={newPassword}
                />
                {errors && errors.new_password && (
                  <div className="error">{errors.new_password[0]}</div>
                )}
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  className="password"
                  ref={newPasswordConfirmation}
                />
                <i className="bx bx-hide eye-icon"></i>
                {errors && errors.new_password_confirmation && (
                  <div className="error">{errors.new_password_confirmation[0]}</div>
                )}
              </div>
              <div className="field button-field">
                <button onClick={handleResetPassword}>Đổi mật khẩu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
