import { NavLink } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../../pages/RegisterPage/RegisterPage.css";
import { useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { ColorRing } from "react-loader-spinner";
import LoadingPage from "../../components/common/LoadingPage";
import { showFailedAlert } from "../../utils/toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { register, errors, setErrors } = useAuthContext();
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = (name, value) => {
    let errors = {};
    if (name === "name" && !value) {
      errors.full_name = "Vui lòng nhập tên người dùng.";
    }
    if (name === "email") {
      if (!value) {
        errors.email = "Vui lòng nhập email.";
      } else {
        const invalidEmailMessage = isInvalidEmail(value);
        if (invalidEmailMessage) {
          errors.email = invalidEmailMessage;
        }
      }
    }

    if (name === "password") {
      if (!value) {
        errors.password = "Vui lòng nhập mật khẩu.";
      } else if (value.length < 8) {
        errors.password = "Mật khẩu có ít nhất 8 ký tự.";
      } else if (!/[A-Z]/.test(value)) {
        errors.password = "Mật khẩu chứa ít nhất 1 ký tự hoa.";
      } else if (!/[a-z]/.test(value)) {
        errors.password = "Mật khẩu chứa ít nhất 1 ký tự thường.";
      } else if (!/[0-9]/.test(value)) {
        errors.password = "Mật khẩu phải có ít nhất 1 chữ số.";
      } else if (!/[!@#$%^&*]/.test(value)) {
        errors.password = "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.";
      }
    }

    if (name === "password_confirmation") {
      if (!value) {
        errors.password_confirmation = "Vui lòng nhập xác nhận mật khẩu.";
      } else if (value !== formValues.password) {
        errors.password_confirmation = "Mật khẩu không trùng khớp.";
      }
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? errors[name] : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue =
      name === "password" || name === "password_confirmation"
        ? value.replace(/\s+/g, "")
        : value;

    setFormValues({
      ...formValues,
      [name]: cleanedValue,
    });
    validate(name, cleanedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;
    for (let name in formValues) {
      validate(name, formValues[name]);
      if (!formValues[name] || formErrors[name]) {
        newErrors[name] = formErrors[name];
        hasErrors = true;
      }
    }

    setFormErrors(newErrors);

    if (hasErrors) {
      showFailedAlert(
        "Có lỗi trong quá trình đăng ký, vui lòng kiểm tra kỹ thông tin."
      );
      return;
    }

    try {
      setLoading(true);
      await register(formValues);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setServerError(error.response.data.errors);
      } else {
        showFailedAlert(error.response.data.message);
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

  return (
    <>
      <ToastContainer />
      <Header />
      <div class="container forms">
        <div className="form show-signup">
          <div className="form-content">
            <header className="form-header">Đăng ký</header>

            <form className="show-signup" onSubmit={handleSubmit}>
              <div
                className={`field input-field ${
                  formErrors.full_name ? "invalid" : ""
                }`}
              >
                <input
                  type="text"
                  name="full_name"
                  value={formValues.full_name}
                  onChange={handleChange}
                  placeholder="Họ tên"
                />
                {formErrors.full_name ? (
                  <span className="text-danger">{formErrors.full_name}</span>
                ) : (
                  <span className="text-danger">{errors?.full_name}</span>
                )}
              </div>
              {/* email */}
              <div
                className={`field input-field ${
                  formErrors.email ? "invalid" : ""
                }`}
              >
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {formErrors.email ? (
                  <span className="text-danger">{formErrors.email}</span>
                ) : (
                  <span className="text-danger">{errors?.email}</span>
                )}
              </div>
              {/* password */}
              <div
                className={`field input-field ${
                  formErrors.password ? "invalid" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                />
                <i
                  onClick={toggleShowPassword}
                  className={
                    showPassword ? "bx bx-show eye-icon" : "bx bx-hide eye-icon"
                  }
                ></i>
                {formErrors.password ? (
                  <span className="text-danger">{formErrors.password}</span>
                ) : (
                  <span className="text-danger">{errors?.password}</span>
                )}
              </div>
              {/* password_confirmation */}
              <div
                className={`field input-field  ${
                  formErrors.password_confirmation ? "invalid" : ""
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  value={formValues.password_confirmation}
                  onChange={handleChange}
                  placeholder="Xác nhận mật khẩu"
                />
                <i
                  onClick={toggleShowConfirmPassword}
                  className={
                    showConfirmPassword
                      ? "bx bx-show eye-icon"
                      : "bx bx-hide eye-icon"
                  }
                ></i>
                {formErrors.password_confirmation && (
                  <span className="text-danger">
                    {formErrors.password_confirmation}
                  </span>
                )}
                {errors && (
                  <span className="text-danger">
                    {errors?.password_confirmation}
                  </span>
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
                Bạn đã có tài khoản?
                <NavLink to="/login" className="link login-link">
                  Đăng nhập
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
