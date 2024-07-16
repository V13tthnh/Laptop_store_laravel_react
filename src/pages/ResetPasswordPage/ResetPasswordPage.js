import { useEffect, useRef, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../../pages/RegisterPage/RegisterPage.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import LoadingPage from "../../components/common/LoadingPage";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const navigator = useNavigate();

  const validatePassword = (newPassword) => {
    if (!newPassword) {
      return "Vui lòng nhập mật khẩu";
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,35}/.test(newPassword)
    ) {
      return "Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt";
    }
    return "";
  };

  const validateConfirmPassword = (newPasswordConfirm) => {
    if (newPasswordConfirm !== newPassword) {
      return "Xác nhận mật khẩu không khớp";
    }
    return "";
  };

  const newPasswordToggle = () => {
    setShowNewPassword(!showNewPassword);
  };

  const newPasswordConfirmToggle = () => {
    setShowNewPasswordConfirm(!showNewPasswordConfirm);
  };

  const handleChangeNewPassword = (event) => {
    const value = event.target.value;
    setNewPassword(value);
    setNewPasswordError(validatePassword(value));
  };

  const handleChangeNewPasswordConfirm = (event) => {
    const value = event.target.value;
    setNewPasswordConfirm(value);
    setNewPasswordConfirmError(validateConfirmPassword(value));
  };

  console.log(newPassword);
  console.log(newPasswordConfirm);
  const handleResetPassword = async (event) => {
    event.preventDefault();
    const newPasswordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(newPasswordConfirm);

    if (newPasswordError || confirmPasswordError) {
      setNewPasswordError(newPasswordError);
      setNewPasswordConfirmError(confirmPasswordError);
      showFailedAlert("Vui lòng xem kỹ thông tin.");
      return;
    }

    try {
      const response = await api.post("/reset-password", {
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirm,
        token: token,
      });
      setLoading(true);
      if (response.data.status) {
        showSuccessAlert(response.data.message);
        setLoading(false);
        setTimeout(() => {
          navigator("/login");
        }, 2000);
      } else {
        showFailedAlert(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        showFailedAlert(error.response.data.message);
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
      <div class="container forms">
        <div className="form show-signup">
          <div className="form-content">
            <header className="form-header">Đổi mật khẩu</header>
            <form action="#" className="show-signup">
              <div className="field input-field">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  className="password"
                  value={newPassword}
                  onChange={handleChangeNewPassword}
                />
                <i
                  className={
                    showNewPassword
                      ? "bx bx-show eye-icon"
                      : "bx bx-hide eye-icon"
                  }
                  onClick={newPasswordToggle}
                ></i>

                {errors && errors.new_password && (
                  <div className="error">{errors.new_password[0]}</div>
                )}
                {newPasswordError && (
                  <div style={{ color: "red" }}>{newPasswordError}</div>
                )}
              </div>
              <div className="field input-field">
                <input
                  type={showNewPasswordConfirm ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu mới"
                  className="password"
                  value={newPasswordConfirm}
                  onChange={handleChangeNewPasswordConfirm}
                />
                <i
                  className={
                    showNewPasswordConfirm
                      ? "bx bx-show eye-icon"
                      : "bx bx-hide eye-icon"
                  }
                  onClick={newPasswordConfirmToggle}
                ></i>
                {errors && errors.new_password_confirmation && (
                  <div className="error">
                    {errors.new_password_confirmation[0]}
                  </div>
                )}
                {newPasswordConfirmError && (
                  <div style={{ color: "red" }}>{newPasswordConfirmError}</div>
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
