import { NavLink } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../../pages/RegisterPage/RegisterPage.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../../context/AuthContext";
import { ColorRing } from "react-loader-spinner";
import LoadingPage from "../../components/common/LoadingPage";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { register, errors } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      name === null ||
      email === null ||
      password === null ||
      passwordConfirmation === null
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    register({
      full_name: name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    setLoading(false);
    resetForm();
    if (!errors) {
      resetForm();
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  const resetForm = () => {
    setName("");
    setPassword("");
    setEmail("");
    setPasswordConfirmation("");
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div class="container forms">
        <div className="form show-signup">
          <div className="form-content">
            <header className="form-header">Đăng ký</header>
            <form action="#" className="show-signup" onSubmit={handleSubmit}>
              {/* full_name */}
              <div
                className={`field input-field ${
                  errors && errors.full_name ? "invalid" : ""
                }`}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ tên"
                  className="input"
                />
                {errors && errors.full_name && (
                  <div className="error">{errors.full_name[0]}</div>
                )}
              </div>
              {/* email */}
              <div
                className={`field input-field ${
                  errors && errors.email ? "invalid" : ""
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="input"
                />
                {errors && errors.email && (
                  <div className="error">{errors.email[0]}</div>
                )}
              </div>
              {/* password */}
              <div
                className={`field input-field ${
                  errors && errors.password ? "invalid" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="password"
                />
                <i
                  className={
                    showPassword ? "bx bx-show eye-icon" : "bx bx-hide eye-icon"
                  }
                  onClick={toggleShowPassword}
                ></i>
                {errors && errors.password && (
                  <p className="error">{errors.password[0]}</p>
                )}
              </div>
              {/* password_confirmation */}
              <div
                className={`field input-field ${
                  errors && errors.password_confirmation ? "invalid" : ""
                }`}
              >
                <input
                  type={showPasswordConfirmation ? "text" : "password"}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="password"
                />
                <i
                  className={
                    showPasswordConfirmation
                      ? "bx bx-show eye-icon"
                      : "bx bx-hide eye-icon"
                  }
                  onClick={toggleShowPasswordConfirmation}
                ></i>
                {errors && errors.password_confirmation && (
                  <p className="error">{errors.password_confirmation[0]}</p>
                )}
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
                    "Đăng ký"
                  )}
                </button>
              </div>
            </form>
            <div className="form-link">
              <span>
                Bạn đã có tài khoản?{" "}
                <NavLink to="/login" className="link login-link">
                  Đăng nhập
                </NavLink>
              </span>
            </div>
          </div>
          {/* <div className="form-line"></div>
          <div className="media-options">
            <a href="#" className="field facebook">
              <i className="bx bxl-facebook facebook-icon"></i>
              <span>Đăng nhập với Facebook</span>
            </a>
          </div>
          <div className="media-options">
            <a href="#" className="field google">
              <img
                src="../../assets/images/menu/logo/google.jpg"
                alt=""
                className="google-img"
              />
              <span>Đăng nhập với Google</span>
            </a>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
