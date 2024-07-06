import { useEffect, useRef, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import useAuthContext from "../../context/AuthContext";
import api from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../api/customer";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../common/LoadingPage";

export default function ChangePassword() {
  const { token, user } = useAuthContext();
  const [loading, setLoading] = useState();
  const newPassword = useRef();
  const newPasswordConfirmation = useRef();
  const navigator = useNavigate();
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (!token) {
      navigator("/login");
      setTimeout(() => {
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }, 1000);
      return;
    }
  }, [token]);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    var passwordObj = {
      user_id: user?.id,
      new_password: newPassword.current.value,
      new_password_confirmation: newPasswordConfirmation.current.value,
    };
    try {
      await changePassword(passwordObj);
      toast.success("Đổi mật khẩu thành công");
      newPassword.current = "";
      newPasswordConfirmation.current = "";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Failed to change" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="page-section mb-60">
        <div className="container">
          <section className="wrapper">
            <LeftSidebar />
            <div className="right">
              <div className="profile">
                <h2>Đổi mật khẩu</h2>
                <div className="profile-area">
                  <div className="box-info-account">
                    {errors.new_password_confirmation && (
                      <p style={{ color: "red" }}>
                        {errors.new_password_confirmation}
                      </p>
                    )}
                    {errors.new_password && (
                      <p style={{ color: "red" }}>{errors.new_password}</p>
                    )}
                    <form
                      className="form-update"
                      id="customer_update_form"
                      onSubmit={handleChangePassword}
                    >
                      <div className="form__line-wrapper">
                        <label>
                          Mật khẩu mới
                          <span style={{ color: "red", fontSize: "17px" }}>
                            *
                          </span>
                        </label>
                        <div className="form__input-wrapper">
                          <input
                            required=""
                            type="password"
                            id="customer-name"
                            className="form-control"
                            name="fullname"
                            placeholder="Nhập mật khẩu mới"
                            size="40"
                            ref={newPassword}
                          />
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label>
                          Nhập lại mật khẩu mới
                          <span style={{ color: "red", fontSize: "17px" }}>
                            *
                          </span>
                        </label>
                        <div className="form__input-wrapper">
                          <input
                            required=""
                            type="password"
                            id="customer-name"
                            className="form-control"
                            name="password"
                            placeholder="Nhập lại mật khẩu mới"
                            size="40"
                            ref={newPasswordConfirmation}
                          />
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label></label>
                        <div className="form__input-wrapper">
                          <input
                            className="button btn-update"
                            id="update"
                            type="submit"
                            value="ĐỔI MẬT KHẨU "
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
