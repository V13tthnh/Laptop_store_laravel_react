import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { createAddress } from "../api/address";
import { useState } from "react";

export default function FormAddAddress() {
  const [provinces, setProvinces] = useState("");
  const [districts, setDistricts] = useState("");
  const [wards, setWards] = useState("");

  const handleProvincesChange = (event) => {
    setProvinces(event.target.value);
  };

  const handleDistrictsChange = (event) => {
    setDistricts(event.target.value);
  };

  const handleWardsChange = (event) => {
    setWards(event.target.value);
  };

  

  return (
    <>
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
              <input name="form_type" type="hidden" value="customer_address" />
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
                    />
                  </div>
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
                    />
                  </div>
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
                        id="demo-simple-select"
                        value={provinces}
                        label="Tỉnh/Thành phố"
                        onChange={handleProvincesChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
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
                        id="demo-simple-select"
                        value={districts}
                        label="Quận/Huyện"
                        onChange={handleDistrictsChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
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
                        id="demo-simple-select"
                        value={wards}
                        label="Phường/Xã"
                        onChange={handleWardsChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
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
                          maxRows={12}
                        />
                      </FormControl>
                    </div>
                  </Box>
                </div>
              </div>
              <div className="form__radio-wrapper d-flex">
                <div className="box-radio">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Đặt làm địa chỉ mặc định"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
