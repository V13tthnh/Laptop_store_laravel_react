import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import api from "../../api/api";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const email = useRef();

  const sendForgotPasswordEmail = async (email) => {
    try {
      const response = await api.post("forgot-password", {
        email: email,
      });
      setLoading(true);
      if (response.data.status) {
        toast.success(response.data.message);
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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

  const handleClick = (event) => {
    event.preventDefault();
    console.log(email);
    if (!email) {
      toast.error(errors.email[0]);
      return;
    }
    sendForgotPasswordEmail(email.current.value);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div class="container forms">
        <div className="form show-signup">
          <div className="form-content">
            <header className="form-header">Quên mật khẩu</header>
            <form action="#" className="show-signup">
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  ref={email}
                />
              </div>

              <div className="field button-field">
                <button onClick={handleClick}>Khôi phục</button>
              </div>
              <div className="form-link">
                <span>
                  <NavLink to="/login" className="link signup-link">
                    <FontAwesomeIcon icon={faArrowLeft} size="md" /> Về lại
                    trang đăng nhập
                  </NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
