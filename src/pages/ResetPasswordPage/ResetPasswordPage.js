import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../../pages/RegisterPage/RegisterPage.css";
import { NavLink } from "react-router-dom";

export default function ResetPasswordPage() {
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
                  type="password"
                  placeholder="Mật khẩu"
                  className="password"
                />
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  className="password"
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  className="password"
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              <div className="field button-field">
                <button>Đổi mật khẩu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
