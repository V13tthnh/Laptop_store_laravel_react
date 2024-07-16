import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import api from "../../api/api";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (email.trim() !== "") {
      const errorMessage = isInvalidEmail(email);
      setError(errorMessage);
    } else {
      setError(null);
    }
  }, [email]);

  const sendForgotPasswordEmail = async (email) => {
    if (!error) {
      setLoading(true);
      try {
        const response = await api.post("forgot-password", {
          email: email,
        });
        setLoading(true);
        if (response.data.status) {
          setTimeout(() => {
            showSuccessAlert(response.data.message);
          }, 3000);
          setLoading(false);
        } else {
          setTimeout(() => {
            showFailedAlert(response.data.message);
          }, 3000);

          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setServerErrors(error.response.data.errors);
        } else {
          showFailedAlert(error.response.data.message);
        }
      }
    }
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
      showFailedAlert(serverErrors.email[0]);
      return;
    }
    sendForgotPasswordEmail(email);
  };

  return (
    <>
      <ToastContainer />
      <Header />
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
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              {error && <div style={{ color: "red" }}>{error}</div>}
              {serverErrors && (
                <div style={{ color: "red" }}>{serverErrors?.email[0]}</div>
              )}
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
