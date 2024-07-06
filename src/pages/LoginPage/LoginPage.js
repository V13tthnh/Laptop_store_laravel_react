import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../../pages/LoginPage/LoginPage.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../../context/AuthContext";
import { ColorRing } from "react-loader-spinner";
import LoadingPage from "../../components/common/LoadingPage";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const { token, login, redirect, errors } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login({ email, password });

      if (!errors) {
        resetForm();
        setLoading(false);
      }
    }, 1500);
  };

  if (loading && !token) {
    return <LoadingPage />;
  }

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
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header className="form-header">Đăng nhập</header>
            <form action="#" onSubmit={handleSubmit}>
              <div className={`field input-field ${errors ? "invalid" : ""}`}>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  value={email}
                />
                {errors && <div className="error">{errors.message}</div>}
              </div>
              <div className={`field input-field ${errors ? "invalid" : ""}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="password"
                />
                <i
                  onClick={toggleShowPassword}
                  className={
                    showPassword ? "bx bx-show eye-icon" : "bx bx-hide eye-icon"
                  }
                ></i>
                {errors && <div className="error">{errors.message}</div>}
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
