import { useEffect, useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../../context/AuthContext";

export default function ModalAddAddress({ onAddSuccess }) {
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
    setPhone(event.target.value);
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
    setAddressDetail(false);
    setErrors({});
  };

  const handleAddAddress = async () => {
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
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Failed to add address" });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={handleClickOpen} className="button add-new-address">
        + Thêm địa chỉ mới
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
                          />
                        </div>
                        {errors.phone && (
                          <p style={{ color: "red" }}>{errors.phone}</p>
                        )}
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
