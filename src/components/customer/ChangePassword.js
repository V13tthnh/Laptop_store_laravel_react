import { useEffect, useRef, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import useAuthContext from "../../context/AuthContext";
import api from "../../api/api";

import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../../api/customer";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../common/LoadingPage";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { Box, InputAdornment, TextField } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";

export default function ChangePassword() {
  const { token, user } = useAuthContext();
  const [loading, setLoading] = useState();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowNewConfirmPassword = () => {
    setShowNewConfirmPassword(!showNewConfirmPassword);
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Vui lòng nhập mật khẩu";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(password)) {
      return "Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== newPassword) {
      return "Xác nhận mật khẩu không khớp";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setNewPasswordError(validatePassword(value));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        showFailedAlert("Vui lòng đăng nhập lại");
      }, 1000);
      return;
    }
  }, [token]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    const newPasswordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (passwordError || newPasswordError || confirmPasswordError) {
      setPasswordError(passwordError);
      setNewPasswordError(newPasswordError);
      setConfirmPasswordError(confirmPasswordError);
      showFailedAlert("Vui lòng xem kỹ thông tin.");
      return;
    }

    var passwordObj = {
      user_id: user?.id,
      password: password,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    };

    

    try {
      setLoading(true);
      const response = await changePassword(passwordObj);
      console.log(response);
      showSuccessAlert("Đổi mật khẩu thành công");
      resetForm();
      setLoading(false);
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

  const resetForm = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setErrors("");
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
                          Mật khẩu hiện tại
                          <span style={{ color: "red", fontSize: "17px" }}>
                            *
                          </span>
                        </label>
                        <div className="form__input-wrapper">
                          <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{
                              "& .MuiTextField-root": { m: 1, width: "51ch" },
                            }}
                          >
                            <div>
                              <TextField
                                type={showPassword ? "text" : "password"}
                                id="outlined-multiline-flexible"
                                size="small"
                                maxRows={12}
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <i
                                        onClick={toggleShowPassword}
                                        className={
                                          showPassword
                                            ? "bx bx-show eye-icon"
                                            : "bx bx-hide eye-icon"
                                        }
                                      ></i>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </div>

                            {passwordError && (
                              <span
                                style={{ color: "red", marginLeft: "10px" }}
                              >
                                <small>{passwordError}</small>
                              </span>
                            )}
                          </Box>
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label>
                          Mật khẩu mới
                          <span style={{ color: "red", fontSize: "17px" }}>
                            *
                          </span>
                        </label>
                        <div className="form__input-wrapper">
                          <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{
                              "& .MuiTextField-root": { m: 1, width: "51ch" },
                            }}
                          >
                            <div>
                              <TextField
                                type={showNewPassword ? "text" : "password"}
                                id="outlined-multiline-flexible"
                                size="small"
                                maxRows={12}
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <i
                                        onClick={toggleShowNewPassword}
                                        className={
                                          showNewPassword
                                            ? "bx bx-show eye-icon"
                                            : "bx bx-hide eye-icon"
                                        }
                                      ></i>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </div>

                            {newPasswordError && (
                              <span
                                style={{ color: "red", marginLeft: "10px" }}
                              >
                                <small>{newPasswordError}</small>
                              </span>
                            )}
                          </Box>
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
                          <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{
                              "& .MuiTextField-root": { m: 1, width: "51ch" },
                            }}
                          >
                            <div>
                              <TextField
                                type={
                                  showNewConfirmPassword ? "text" : "password"
                                }
                                id="outlined-multiline-flexible"
                                size="small"
                                maxRows={12}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <i
                                        onClick={toggleShowNewConfirmPassword}
                                        className={
                                          showNewConfirmPassword
                                            ? "bx bx-show eye-icon"
                                            : "bx bx-hide eye-icon"
                                        }
                                      ></i>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </div>

                            {confirmPasswordError && (
                              <span
                                style={{ color: "red", marginLeft: "10px" }}
                              >
                                <small>{confirmPasswordError}</small>
                              </span>
                            )}
                          </Box>
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label></label>
                        <div className="form__input-wrapper">
                          <input
                            className="button btn-update"
                            id="update"
                            type="submit"
                            value="Đổi mật khẩu"
                            disabled={loading}
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
