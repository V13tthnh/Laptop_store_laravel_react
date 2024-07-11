import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { getAllBrands } from "../../api/brand";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export default function LeftSidebarFilter() {
  const [price, setPrice] = useState([0, 145000000]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    cpu: '',
    ram: '',
    hardware: '',
    screen: ''
  });

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div
        className="teko-col teko-col-2 css-17ajfcv"
        style={{ paddingLeft: "8px", paddingRight: "8px" }}
      >
        <div className="css-1psc7jy">
          <div type="subtitle" className="css-y7yt88">
            <b>Khoảng giá</b>
          </div>
          <div className="css-9bznj9">
            <div className="css-1n5trgy" direction="row">
              <span className="css-11mfy90">{formatCurrency(price[0])}</span>
              <span className="css-11mfy90">{formatCurrency(price[1])}</span>
            </div>
            <div className="css-1vlfwg">
              <Box sx={{ width: 230 }}>
                <Slider
                  size="small"
                  value={price}
                  min={0}
                  max={145000000}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                />
              </Box>
            </div>
          </div>
          <div className="css-1veiyrs">
            <div width="100%" color="border" className="css-yae08c"></div>
          </div>
          <div className="css-0">
            <div className="css-gr7w3w">
              <div type="subtitle" className="css-q3day0">
                <b>Thương hiệu</b>
              </div>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="active css-500jnn"
                color="textPrimary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8.5L12 15.5L19 8.5"
                  stroke="#82869E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="active css-1i3vt0z">
              <div direction="row" className="css-1skvw03">
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    label={
                      <Typography variant="body2" color="textSecondary">
                        LENOVO
                      </Typography>
                    }
                    control={<Checkbox size="small" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        DELL
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        MSI
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        ACER
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        HP
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        MASSTEL
                      </Typography>
                    }
                    size="small"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        ASUS
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        MACCBOOK
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="css-1veiyrs">
            <div width="100%" color="border" className="css-yae08c"></div>
          </div>
          <div className="css-0">
            <div className="css-gr7w3w">
              <div type="subtitle" className="css-q3day0">
                <b>Nhu cầu</b>
              </div>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="active css-500jnn"
                color="textPrimary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8.5L12 15.5L19 8.5"
                  stroke="#82869E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="active css-1i3vt0z">
              <div direction="row" className="css-1skvw03">
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    label={
                      <Typography variant="body2" color="textSecondary">
                        LENOVO
                      </Typography>
                    }
                    control={<Checkbox size="small" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        DELL
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        MSI
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        ACER
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        HP
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        MASSTEL
                      </Typography>
                    }
                    size="small"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        ASUS
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        MACCBOOK
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="css-1veiyrs">
            <div width="100%" color="border" className="css-yae08c"></div>
          </div>
          <div className="css-0">
            <div className="css-gr7w3w">
              <div type="subtitle" className="css-q3day0">
                <b>CPU</b>
              </div>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="active css-500jnn"
                color="textPrimary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8.5L12 15.5L19 8.5"
                  stroke="#82869E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="active css-1i3vt0z">
              <div direction="row" className="css-1skvw03">
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Core i9
                      </Typography>
                    }
                    control={<Checkbox size="small" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Core i7
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Core i5
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Core i3
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Core 7
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Ryzen 9
                      </Typography>
                    }
                    size="small"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Ryzen 7
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Ryzen 5
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Apple M1
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Apple M2
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Apple M3
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Apple M3 Pro
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Apple M3 Max
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="css-1veiyrs">
            <div width="100%" color="border" className="css-yae08c"></div>
          </div>
          <div className="css-0">
            <div className="css-gr7w3w">
              <div type="subtitle" className="css-q3day0">
                <b>RAM</b>
              </div>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="active css-500jnn"
                color="textPrimary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8.5L12 15.5L19 8.5"
                  stroke="#82869E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="active css-1i3vt0z">
              <div direction="row" className="css-1skvw03">
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    label={
                      <Typography variant="body2" color="textSecondary">
                        8 GB
                      </Typography>
                    }
                    control={<Checkbox size="small" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        16 GB
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        18 GB
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        32 GB
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        36 GB
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        64 GB
                      </Typography>
                    }
                    size="small"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="css-1veiyrs">
            <div width="100%" color="border" className="css-yae08c"></div>
          </div>
          <div className="css-0">
            <div className="css-gr7w3w">
              <div type="subtitle" className="css-q3day0">
                <b>Ổ Cứng</b>
              </div>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="active css-500jnn"
                color="textPrimary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8.5L12 15.5L19 8.5"
                  stroke="#82869E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="active css-1i3vt0z">
              <div direction="row" className="css-1skvw03">
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    label={
                      <Typography variant="body2" color="textSecondary">
                        SSD 2TB
                      </Typography>
                    }
                    control={<Checkbox size="small" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        SSD 1TB
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        SSD 512 GB
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        SSD 256GB
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="css-1veiyrs">
            <div width="100%" color="border" className="css-yae08c"></div>
          </div>
          <div className="css-0">
            <div className="css-gr7w3w">
              <div type="subtitle" className="css-q3day0">
                <b>Màn Hình</b>
              </div>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="active css-500jnn"
                color="textPrimary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8.5L12 15.5L19 8.5"
                  stroke="#82869E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="active css-1i3vt0z">
              <div direction="row" className="css-1skvw03">
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    label={
                      <Typography variant="body2" color="textSecondary">
                        1.16 inch
                      </Typography>
                    }
                    control={<Checkbox size="small" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        13.3 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        13.6 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        14 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        14.2 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        15.6 inch
                      </Typography>
                    }
                    size="small"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        16 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        16.1 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        16.2 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        17 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        17.3 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
                <div style={{ minWidth: "50%" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        18 inch
                      </Typography>
                    }
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
