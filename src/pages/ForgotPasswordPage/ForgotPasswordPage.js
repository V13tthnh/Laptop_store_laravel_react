import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <div class="container forms">
        <div className="form show-signup">
          <div className="form-content">
            <header className="form-header">Quên mật khẩu</header>
            <form action="#" className="show-signup">
              <div className="field input-field">
                <input type="email" placeholder="Email" className="input" />
              </div>
              <div className="field button-field">
                <button>Khôi phục</button>
              </div>
              <div className="form-link">
                <span>
                  {" "}
                  <NavLink to="/login" className="link signup-link">
                  <FontAwesomeIcon icon={faArrowLeft} size="md" /> Về lại trang đăng nhập
                  </NavLink>
                </span>
              </div>
            </form>
          </div>
          <div className="form-line"></div>
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
