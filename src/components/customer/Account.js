import { useEffect, useState } from "react";
import "../../pages/AccountPage/AccountPage.css";
import LeftSidebar from "./LeftSidebar";
import useAuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import LoadingPage from "../common/LoadingPage";
import { updateProfile } from "../../api/customer";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const { token, user, getUser } = useAuthContext();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Nam");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (!value.endsWith("@gmail.com")) {
      setErrors((prev) => ({
        ...prev,
        email: "Email phải đúng định dạng miền @gmail.com",
      }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
    if (!/^0\d{9}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Số điện thoại phải đủ 10 ký tự và bắt đầu bằng 0",
      }));
    } else {
      setErrors((prev) => {
        const { phone, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        showFailedAlert("Vui lòng đăng nhập lại");
      }, 1000);
      return;
    }

    setFullName(user?.full_name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setGender(user?.gender || "");
    if (user?.birthday) {
      splitDate(user.birthday);
    }

  }, [token, user, navigate]);

  if (loading) {
    return <LoadingPage />;
  }

  const splitDate = (dateString) => {
    if (typeof dateString !== "string") {
      console.error("Invalid date string:", dateString);
      return;
    }

    const parts = dateString.split("/");

    if (parts.length !== 3) {
      console.error("Invalid date format:", dateString);
      return;
    }

    const [day, month, year] = parts;

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      console.error("Invalid date values:", dateString);
      return;
    }

    setDay(day);
    setMonth(month);
    setYear(year);
  };

  const submitChange = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      showFailedAlert("Vui lòng kiểm tra kỹ thông tin.");
      return;
    }
    var birthday = `${year}-${month}-${day}`;
    var profileObj = {
      user_id: user?.id,
      full_name: fullName,
      gender: gender,
      phone: phone,
      email: email,
      birthday: birthday,
    };
    handleUpdate(profileObj);
  };

  const handleUpdate = async (profileObj) => {
    try {
      setLoading(true);
      const response = await updateProfile(profileObj);
      console.log(response.data);
      setErrors({});
      await getUser(token);
      setTimeout(() => {
        showSuccessAlert("Cập nhật thành công.");
      }, 1500);
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

  return (
    <>
      <ToastContainer />
      <div className="page-section mb-60">
        <div className="container">
          <section className="wrapper">
            <LeftSidebar data={user} />
            <div className="right">
              <div className="profile">
                <h2>Thông tin tài khoản</h2>
                <div className="profile-area">
                  <div className="box-info-account">
                    {errors.submit && (
                      <div className="error">{errors.submit}</div>
                    )}
                    <form
                      className="form-update"
                      id="customer_update_form"
                      onSubmit={submitChange}
                    >
                      <div className="form__line-wrapper">
                        <label>
                          Họ Tên
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
                                id="outlined-multiline-flexible"
                                label="Họ tên"
                                maxRows={12}
                                value={fullName}
                                onChange={handleFullNameChange}
                              />
                            </div>
                            {errors.full_name && (
                              <span className="text-danger">
                                <small>{errors.full_name}</small>
                              </span>
                            )}
                          </Box>
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label>Giới tính</label>
                        <div className="form__radio-wrapper">
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              value={gender}
                              onChange={handleGenderChange}
                            >
                              <FormControlLabel
                                value="Nam"
                                control={<Radio />}
                                label="Nam"
                                style={{ marginLeft: "20px" }}
                              />
                              <FormControlLabel
                                value="Nữ"
                                control={
                                  <Radio style={{ marginLeft: "20px" }} />
                                }
                                label="Nữ"
                                style={{ marginLeft: "20px" }}
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label>
                          Số điện thoại
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
                              "& .MuiTextField-root": {
                                m: 1,
                                width: "51ch",
                              },
                            }}
                          >
                            <div>
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Số điện thoại"
                                maxRows={12}
                                value={phone}
                                onChange={handlePhoneChange}
                              />
                            </div>
                            {errors.phone && (
                              <span className="text-danger">
                                <small>{errors.phone}</small>
                              </span>
                            )}
                          </Box>
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label>
                          Email
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
                              "& .MuiTextField-root": {
                                m: 1,
                                width: "51ch",
                              },
                            }}
                          >
                            <div>
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Email"
                                type="email"
                                maxRows={12}
                                value={email}
                                onChange={handleEmailChange}
                              />
                            </div>
                            {errors.email && (
                              <span className="text-danger">
                                <small>{errors.email}</small>
                              </span>
                            )}
                          </Box>
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label>
                          Ngày sinh
                          <span style={{ color: "red", fontSize: "17px" }}>
                            *
                          </span>
                        </label>

                        <div className="form__select-wrapper d-flex">
                          <div className="select-group">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Ngày
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={day}
                                label="Ngày"
                                onChange={handleDayChange}
                                style={{ width: "152px" }}
                              >
                                <MenuItem value="">Ngày</MenuItem>
                                <MenuItem value="01">01</MenuItem>
                                <MenuItem value="02">02</MenuItem>
                                <MenuItem value="03">03</MenuItem>
                                <MenuItem value="04">04</MenuItem>
                                <MenuItem value="05">05</MenuItem>
                                <MenuItem value="06">06</MenuItem>
                                <MenuItem value="07">07</MenuItem>
                                <MenuItem value="08">08</MenuItem>
                                <MenuItem value="09">09</MenuItem>
                                <MenuItem value="10">10</MenuItem>
                                <MenuItem value="11">11</MenuItem>
                                <MenuItem value="12">12</MenuItem>
                                <MenuItem value="13">13</MenuItem>
                                <MenuItem value="14">14</MenuItem>
                                <MenuItem value="15">15</MenuItem>
                                <MenuItem value="16">16</MenuItem>
                                <MenuItem value="17">17</MenuItem>
                                <MenuItem value="18">18</MenuItem>
                                <MenuItem value="19">19</MenuItem>
                                <MenuItem value="20">20</MenuItem>
                                <MenuItem value="21">21</MenuItem>
                                <MenuItem value="22">22</MenuItem>
                                <MenuItem value="23">23</MenuItem>
                                <MenuItem value="24">24</MenuItem>
                                <MenuItem value="25">25</MenuItem>
                                <MenuItem value="26">26</MenuItem>
                                <MenuItem value="27">27</MenuItem>
                                <MenuItem value="28">28</MenuItem>
                                <MenuItem value="29">29</MenuItem>
                                <MenuItem value="30">30</MenuItem>
                                <MenuItem value="31">31</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="select-group">
                            <FormControl fullWidth style={{ width: "130px" }}>
                              <InputLabel id="demo-simple-select-label">
                                Tháng
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={month}
                                label="Tháng"
                                onChange={handleMonthChange}
                              >
                                <MenuItem value="">Tháng</MenuItem>

                                <MenuItem value="01">01</MenuItem>

                                <MenuItem value="02">02</MenuItem>

                                <MenuItem value="03">03</MenuItem>

                                <MenuItem value="04">04</MenuItem>

                                <MenuItem value="05">05</MenuItem>

                                <MenuItem value="06">06</MenuItem>

                                <MenuItem value="07">07</MenuItem>

                                <MenuItem value="08">08</MenuItem>

                                <MenuItem value="09">09</MenuItem>

                                <MenuItem value="10">10</MenuItem>

                                <MenuItem value="11">11</MenuItem>

                                <MenuItem value="12">12</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="select-group">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Năm
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Năm"
                                onChange={handleYearChange}
                                style={{ width: "152px" }}
                              >
                                <MenuItem value="">Năm</MenuItem>
                                <MenuItem value="1930">1930</MenuItem>

                                <MenuItem value="1931">1931</MenuItem>

                                <MenuItem value="1932">1932</MenuItem>

                                <MenuItem value="1933">1933</MenuItem>

                                <MenuItem value="1934">1934</MenuItem>

                                <MenuItem value="1935">1935</MenuItem>

                                <MenuItem value="1936">1936</MenuItem>

                                <MenuItem value="1937">1937</MenuItem>

                                <MenuItem value="1938">1938</MenuItem>

                                <MenuItem value="1939">1939</MenuItem>

                                <MenuItem value="1940">1940</MenuItem>

                                <MenuItem value="1941">1941</MenuItem>

                                <MenuItem value="1942">1942</MenuItem>

                                <MenuItem value="1943">1943</MenuItem>

                                <MenuItem value="1944">1944</MenuItem>

                                <MenuItem value="1945">1945</MenuItem>

                                <MenuItem value="1946">1946</MenuItem>

                                <MenuItem value="1947">1947</MenuItem>

                                <MenuItem value="1948">1948</MenuItem>

                                <MenuItem value="1949">1949</MenuItem>

                                <MenuItem value="1950">1950</MenuItem>

                                <MenuItem value="1951">1951</MenuItem>

                                <MenuItem value="1952">1952</MenuItem>

                                <MenuItem value="1953">1953</MenuItem>

                                <MenuItem value="1954">1954</MenuItem>

                                <MenuItem value="1955">1955</MenuItem>

                                <MenuItem value="1956">1956</MenuItem>

                                <MenuItem value="1957">1957</MenuItem>

                                <MenuItem value="1958">1958</MenuItem>

                                <MenuItem value="1959">1959</MenuItem>

                                <MenuItem value="1960">1960</MenuItem>

                                <MenuItem value="1961">1961</MenuItem>

                                <MenuItem value="1962">1962</MenuItem>

                                <MenuItem value="1963">1963</MenuItem>

                                <MenuItem value="1964">1964</MenuItem>

                                <MenuItem value="1965">1965</MenuItem>

                                <MenuItem value="1966">1966</MenuItem>

                                <MenuItem value="1967">1967</MenuItem>

                                <MenuItem value="1968">1968</MenuItem>

                                <MenuItem value="1969">1969</MenuItem>

                                <MenuItem value="1970">1970</MenuItem>

                                <MenuItem value="1971">1971</MenuItem>

                                <MenuItem value="1972">1972</MenuItem>

                                <MenuItem value="1973">1973</MenuItem>

                                <MenuItem value="1974">1974</MenuItem>

                                <MenuItem value="1975">1975</MenuItem>

                                <MenuItem value="1976">1976</MenuItem>

                                <MenuItem value="1977">1977</MenuItem>

                                <MenuItem value="1978">1978</MenuItem>

                                <MenuItem value="1979">1979</MenuItem>

                                <MenuItem value="1980">1980</MenuItem>

                                <MenuItem value="1981">1981</MenuItem>

                                <MenuItem value="1982">1982</MenuItem>

                                <MenuItem value="1983">1983</MenuItem>

                                <MenuItem value="1984">1984</MenuItem>

                                <MenuItem value="1985">1985</MenuItem>

                                <MenuItem value="1986">1986</MenuItem>

                                <MenuItem value="1987">1987</MenuItem>

                                <MenuItem value="1988">1988</MenuItem>

                                <MenuItem value="1989">1989</MenuItem>

                                <MenuItem value="1990">1990</MenuItem>

                                <MenuItem value="1991">1991</MenuItem>

                                <MenuItem value="1992">1992</MenuItem>

                                <MenuItem value="1993">1993</MenuItem>

                                <MenuItem value="1994">1994</MenuItem>

                                <MenuItem value="1995">1995</MenuItem>

                                <MenuItem value="1996">1996</MenuItem>

                                <MenuItem value="1997">1997</MenuItem>

                                <MenuItem value="1998">1998</MenuItem>

                                <MenuItem value="1999">1999</MenuItem>

                                <MenuItem value="2000">2000</MenuItem>

                                <MenuItem value="2001">2001</MenuItem>

                                <MenuItem value="2002">2002</MenuItem>

                                <MenuItem value="2003">2003</MenuItem>

                                <MenuItem value="2004">2004</MenuItem>

                                <MenuItem value="2005">2005</MenuItem>

                                <MenuItem value="2006">2006</MenuItem>

                                <MenuItem value="2007">2007</MenuItem>

                                <MenuItem value="2008">2008</MenuItem>

                                <MenuItem value="2009">2009</MenuItem>

                                <MenuItem value="2010">2010</MenuItem>

                                <MenuItem value="2011">2011</MenuItem>

                                <MenuItem value="2012">2012</MenuItem>

                                <MenuItem value="2013">2013</MenuItem>

                                <MenuItem value="2014">2014</MenuItem>

                                <MenuItem value="2015">2015</MenuItem>

                                <MenuItem value="2016">2016</MenuItem>

                                <MenuItem value="2017">2017</MenuItem>

                                <MenuItem value="2018">2018</MenuItem>

                                <MenuItem value="2019">2019</MenuItem>

                                <MenuItem value="2020">2020</MenuItem>

                                <MenuItem value="2021">2021</MenuItem>

                                <MenuItem value="2022">2022</MenuItem>

                                <MenuItem value="2023">2023</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className="form__line-wrapper">
                        <label></label>
                        <div className="form__input-wrapper">
                          <input
                            className="button btn-update"
                            id="update"
                            type="submit"
                            value="LƯU THAY ĐỔI"
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
