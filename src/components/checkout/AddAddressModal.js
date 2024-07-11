import { useEffect, useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import {
  createAddress,
  getDistrictsByProvinceId,
  getWardsByDistrictsId,
  getProvinces,
} from "../../api/address";
import useAuthContext from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";

export default function AddAddressModal({ onAddSuccess }) {
  const [open, setOpen] = useState(false);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [provinces, setProvinces] = useState("");
  const [provincesId, setProvincesId] = useState(0);
  const [districtId, setDisctricId] = useState(0);
  const [districts, setDistricts] = useState("");
  const [wards, setWards] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [errors, setErrors] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    loadProvinces();
    if (provinces) {
      loadDistricts(provincesId);
    }
    if (districts) {
      loadWards(districtId);
    }
  }, [provinces, districts]);

  const loadProvinces = async () => {
    try {
      const data = await getProvinces();
      setProvinceData(data.data);
    } catch (error) {
      console.error("Failed to load provinces:", error);
    }
  };

  const loadDistricts = async (provinceId) => {
    try {
      const data = await getDistrictsByProvinceId(provinceId);
      setDistrictData(data.data);
    } catch (error) {
      console.error("Failed to load districts:", error);
    }
  };

  const loadWards = async (districtId) => {
    try {
      const data = await getWardsByDistrictsId(districtId);
      setWardData(data.data);
    } catch (error) {
      console.error("Failed to load wards:", error);
    }
  };

  const handleProvincesChange = (event) => {
    setProvinces(event.target.value);
    setProvincesId(event.target.value);
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
    if (!validatePhone(value)) {
      setError("Số điện thoại không hợp lệ");
    } else {
      setError("");
    }
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    if (!validatePhone(value)) {
      setError("Số điện thoại gồm 10 số và bắt đầu bằng 0.");
    } else {
      setError("");
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleAddressDetailChange = (event) => {
    setAddressDetail(event.target.value);
  };

  const handleDistrictsChange = (event) => {
    setDistricts(event.target.value);
    setDisctricId(event.target.value);
  };

  const handleWardsChange = (event) => {
    setWards(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setProvinces("");
    setDistricts("");
    setWards("");
    setFullName("");
    setPhone("");
    setAddressDetail("");
    setErrors({});
    setError("");
  };

  const handleAddAddress = async () => {
    if (validatePhone(phone)) {
      setError("");
      let newAddress = {
        full_name: fullName,
        phone: phone,
        provinces: provinces,
        district: districts,
        address_detail: addressDetail,
        ward: wards,
        user_id: user?.id,
      };
      try {
        await createAddress(newAddress);

        resetForm();
        setOpen(false);
        onAddSuccess("Thêm địa chỉ thành công.");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ submit: "Failed to add address" });
        }
      }
    } else {
      setError("Số điện thoại không hợp lệ");
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Button
        onClick={handleClickOpen}
        height="2.5rem"
        className="css-1pytm6y"
        type="button"
        style={{
          color: "rgb(132, 135, 136)",
          minHeight: "100px",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          size="25"
          className="css-1e44j4b"
          color="#848788"
          height="25"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4V11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H11.25V20C11.25 20.4142 11.5858 20.75 12 20.75C12.4142 20.75 12.75 20.4142 12.75 20V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H12.75V4Z"
            fill="#82869E"
          ></path>
        </svg>
        Thêm địa chỉ
        <span style={{ marginLeft: "0px" }}>
          <div className="css-157jl91"></div>
        </span>
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth="1">
        <DialogContent>
          <DialogContentText>
            <div className="modal-content">
              <div className="modal-header">
                <h4>ĐỊA CHỈ MỚI</h4>
              </div>
              <div className="modal-body">
                <div
                  id="add_address"
                  className="customer_address edit_address add_address"
                >
                  <form id="address_form_new">
                    <input
                      name="form_type"
                      type="hidden"
                      value="customer_address"
                    />
                    <input name="utf8" type="hidden" value="✓" />
                    <h5>Thông tin khách hàng</h5>
                    <div className="form__input-wrapper form__input-wrapper--labelled">
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
                            onChange={handleFullNameChange}
                          />
                        </div>
                        {errors.full_name && (
                          <p style={{ color: "red" }}>{errors.full_name}</p>
                        )}
                      </Box>
                    </div>
                    <div className="form__input-wrapper form__input-wrapper--labelled">
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
                            label="Số điện thoại"
                            maxRows={12}
                            onChange={handlePhoneChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {errors.phone && (
                          <p style={{ color: "red" }}>{errors.phone}</p>
                        )}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                      </Box>
                    </div>
                    <h5>Địa chỉ</h5>
                    <div className="form__line-wrapper">
                      <div
                        className="form__input-wrapper select-group"
                        id="address_province_container_new"
                      >
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Tỉnh/Thành phố
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="provinces"
                              value={provinces}
                              label="Tỉnh/Thành phố"
                              onChange={handleProvincesChange}
                            >
                              <MenuItem value={0} disabled>
                                Chọn Tỉnh/ Thành phố
                              </MenuItem>
                              {provinceData &&
                                provinceData.map((province) => (
                                  <MenuItem
                                    key={province.id}
                                    value={province.id}
                                  >
                                    {province.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          {errors.provinces && (
                            <p style={{ color: "red" }}>{errors.provinces}</p>
                          )}
                        </Box>
                      </div>
                      <div
                        className="form__input-wrapper select-group"
                        id="address_district_container_new"
                      >
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Quận/Huyện
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="districts"
                              value={districts}
                              disabled={!provinces}
                              label="Quận/Huyện"
                              onChange={handleDistrictsChange}
                            >
                              {districtData &&
                                districtData.map((district) => (
                                  <MenuItem
                                    key={district.id}
                                    value={district.id}
                                  >
                                    {district.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          {errors.district && (
                            <p style={{ color: "red" }}>{errors.district}</p>
                          )}
                        </Box>
                      </div>
                    </div>
                    <div className="form__line-wrapper">
                      <div
                        className="form__input-wrapper select-group"
                        id="address_ward_container_new"
                      >
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Phường/Xã
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="wards"
                              value={wards}
                              disabled={!districts && !provinces}
                              label="Phường/Xã"
                              onChange={handleWardsChange}
                            >
                              {wardData &&
                                wardData.map((ward) => (
                                  <MenuItem key={ward.id} value={ward.id}>
                                    {ward.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          {errors.ward && (
                            <p style={{ color: "red" }}>{errors.ward}</p>
                          )}
                        </Box>
                      </div>
                      <div className="form__input-wrapper form__input-wrapper--labelled">
                        <Box
                          component="form"
                          noValidate
                          autoComplete="off"
                          sx={{ minWidth: 120 }}
                        >
                          <div>
                            <FormControl fullWidth>
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Địa chỉ cụ thể"
                                value={addressDetail}
                                maxRows={12}
                                onChange={handleAddressDetailChange}
                              />
                            </FormControl>
                          </div>
                          {errors.address_detail && (
                            <p style={{ color: "red" }}>
                              {errors.address_detail}
                            </p>
                          )}
                        </Box>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleAddAddress}>Lưu địa chỉ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
