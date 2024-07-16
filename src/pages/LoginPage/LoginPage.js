import { NavLink } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../../pages/LoginPage/LoginPage.css";
import { useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { ColorRing } from "react-loader-spinner";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const { token, login, redirect, errors } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value.replace(/\s+/g, '');
    setPassword(inputValue);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showFailedAlert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const formErrors = {};

    if (!email) {
      errors.email = "Vui lòng nhập email.";
    } else {
      const invalidEmailMessage = isInvalidEmail(email);
      if (invalidEmailMessage) {
        errors.email = invalidEmailMessage;
      }
    }

    if (password && !validatePassword(password)) {
      formErrors.password =
        "Mật khẩu có ít nhất 8 ký tự, bao gồm chữ thường, hoa, số và ký tự đặc biệt.";
      //showFailedAlert(formErrors.password);
    }
    setFormErrors(formErrors);

    if (errors) {
      showFailedAlert(errors.message);
      setLoading(false);
      return;
    }

    if (Object.keys(formErrors).length === 0) {
      try {
        setLoading(true);
        login({ email, password });
        if (!formErrors && !errors) {
          setTimeout(() => {
            resetForm();
            setLoading(false);
          }, 1500);
        } else {
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
  };

  const redirectToFacebook = async (e) => {
    e.preventDefault();
    setLoadingFacebook(true);

    setTimeout(() => {
      redirect("facebook");

      if (!errors) {
        setLoadingFacebook(false);
      }
    }, 1500);
  };

  const redirectToGoogle = async (e) => {
    e.preventDefault();
    setLoadingGoogle(true);

    setTimeout(() => {
      redirect("google");

      if (!errors) {
        setLoadingGoogle(false);
      }
    }, 1500);
  };

  const resetForm = () => {
    setPassword("");
    setEmail("");
    setFormErrors("");
  };

  const isInvalidEmail = (email) => {
    const invalidCases = [
      {
        regex: /@/,
        condition: (email) => email.split("@").length !== 2,
        message: "Email phải chứa đúng một ký tự @",
      },
      {
        regex: /^[^@]+$/,
        condition: (email) => !/^[^@]+@[^@]+\.[^@]+$/.test(email),
        message: "Email phải chứa đúng một ký tự @ và có dạng tên@miền",
      },
      {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        condition: (email) =>
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
        message: "Email không hợp lệ.",
      },
      {
        regex: /"/,
        condition: (email) => {
          const localPart = email.split("@")[0];
          return /"/.test(localPart) && !/^"[^"]*"$/.test(localPart);
        },
        message: "Email không hợp lệ",
      },
      {
        regex: /\\| /,
        condition: (email) => {
          const localPart = email.split("@")[0];
          return /\\| /.test(localPart) && !/^"[^"]*"$/.test(localPart);
        },
        message:
          "Khoảng trắng, dấu ngoặc kép và dấu gạch chéo phải nằm trong chuỗi ngoặc kép và phải có dấu gạch chéo trước đó",
      },
      {
        regex: /.{65,}@/,
        condition: (email) => email.split("@")[0].length > 64,
        message: "Phần local-part không được dài hơn 64 ký tự",
      },
      {
        regex: /_/,
        condition: (email) => /@.*_/.test(email),
        message: "Dấu gạch dưới không được phép xuất hiện trong phần miền",
      },
    ];

    for (const caseCheck of invalidCases) {
      if (caseCheck.regex.test(email) && caseCheck.condition(email)) {
        return caseCheck.message;
      }
    }

    return null;
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header className="form-header">Đăng nhập</header>
            <form action="#" onSubmit={handleSubmit}>
              <div
                className={`field input-field ${
                  formErrors.email ? "invalid" : ""
                }`}
              >
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  value={email}
                />
                {formErrors.email && (
                  <span className="text-danger">{formErrors.email}</span>
                )}
              </div>
              <div
                className={`field input-field ${
                  formErrors.password ? "invalid" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Mật khẩu"
                  className="password"
                />
                <i
                  onClick={toggleShowPassword}
                  className={
                    showPassword ? "bx bx-show eye-icon" : "bx bx-hide eye-icon"
                  }
                ></i>
                {formErrors.password && (
                  <span className="text-danger">{formErrors.password}</span>
                )}
              </div>
              <div className="form-link">
                <NavLink to="/forgot-password" className="forgot-pass">
                  Quên mật khẩu?
                </NavLink>
              </div>
              <div className="field button-field">
                <button disabled={loading}>
                  {loading ? (
                    <ColorRing
                      visible={true}
                      height="35"
                      width="35"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                    />
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </div>
            </form>
            <div className="form-link">
              <span>
                Bạn chưa có tài khoản?{" "}
                <NavLink to="/register" className="link signup-link">
                  Đăng ký ngay
                </NavLink>
              </span>
            </div>
          </div>
          <div className="form-line"></div>
          <div className="media-options">
            <a
              href="#"
              onClick={redirectToFacebook}
              className="field facebook"
              disabled={loadingFacebook}
            >
              <i className="bx bxl-facebook facebook-icon"></i>
              <span>
                {loadingFacebook ? (
                  <ColorRing
                    visible={true}
                    height="35"
                    width="35"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                  />
                ) : (
                  "Đăng nhập bằng facebook"
                )}
              </span>
            </a>
          </div>
          <div className="media-options">
            <a href="#" className="field google" onClick={redirectToGoogle}>
              <img
                src="../../assets/images/menu/logo/google.jpg"
                alt=""
                className="google-img"
              />
              <span>
                {loadingGoogle ? (
                  <ColorRing
                    visible={true}
                    height="35"
                    width="35"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#3367d6",
                      "#3367d6",
                      "#3367d6",
                      "#3367d6",
                      "#3367d6",
                    ]}
                  />
                ) : (
                  "Đăng nhập bằng Google"
                )}
              </span>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
