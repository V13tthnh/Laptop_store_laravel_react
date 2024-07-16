import { useEffect, useState } from "react";
import NotFoundFilter from "../../components/filter/NotFoundFilter";
import RelatedProductFilter from "../../components/filter/RelatedProductFilter";
import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../FilterPage/FilterPage.css";
import { filterProduct } from "../../api/product";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingPage from "../../components/common/LoadingPage";
import FilterItem from "../../components/filter/filterItem";
import {
  Checkbox,
  Pagination,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function FilterPage() {
  const [products, setProducts] = useState();
  const [price, setPrice] = useState([0, 145000000]);
  const query = useQuery();
  const [selectedSort, setSelectedSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchTerm = query.get("search") || "";
  const categoryId = query.get("categoryId") || "";

  const [filters, setFilters] = useState({
    searchTerm: searchTerm,
    category: categoryId,
    cpu: [],
    ram: [],
    hardware: [],
    screen: [],
    brand_id: [],
    max_price: price[1],
    min_price: price[0],
    sort_by: "",
    page: 1,
    limit: 6,
  });

  console.log(filters);

  const handlePriceChange = (event, newValue) => {
    setFilters({
      ...filters,
      min_price: newValue[0],
      max_price: newValue[1],
    });
  };

  const handleSortChange = (event, value) => {
    if (selectedSort === value) {
      setSelectedSort(null); // Bỏ chọn sort nếu đã được chọn trước đó
      setFilters({
        ...filters,
        sort_by: null, // Cập nhật filter về null để không áp dụng sort
      });
    } else {
      setSelectedSort(value); // Chọn sort nếu chưa được chọn trước đó
      setFilters({
        ...filters,
        sort_by: value,
      });
    }
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm,
      category: categoryId,
      page: 1,
    }));
  }, [searchTerm, categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await filterProduct(filters);

        setProducts(response.data);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, [filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await filterProduct(filters);

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleFilterChange = (event) => {
    const { name, checked, value } = event.target;
    let updatedValues;

    if (name === "min_price" || name === "max_price") {
      setFilters({
        ...filters,
        [name]: value,
      });
    } else if (name === "sort_by") {
      setFilters({
        ...filters,
        sort_by: value,
      });
    } else {
      updatedValues = [...filters[name]];
      if (checked) {
        updatedValues.push(value);
      } else {
        updatedValues = updatedValues.filter((item) => item !== value);
      }
      setFilters({
        ...filters,
        [name]: updatedValues,
      });
    }
  };

  const handleFilterSubmit = () => {
    const fetchProducts = async () => {
      try {
        const response = await filterProduct(filters);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  };

  const handlePageChange = (event, value) => {
    setFilters({
      ...filters,
      page: value,
    });
  };

  if (!products) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  const sortOptions = [
    { label: "Giá tăng dần", value: "price_asc" },
    { label: "Giá giảm dần", value: "price_desc" },
    { label: "Sản phẩm nổi bật", value: "featured" },
    { label: "Sản phẩm bán chạy", value: "best_selling" },
  ];

  return (
    <>
    <ToastContainer/>
      <Header />
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li>
                <NavLink to="/">
                  <FontAwesomeIcon icon={faHome} size="lg" /> Trang chủ
                </NavLink>
              </li>
              {searchTerm ? (
                <li>Laptop {searchTerm}</li>
              ) : (
                <li>
                  Laptop gaming | Laptop chơi game cấu hình mạnh, chính hãng
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="content-wraper pt-20 pb-60 pt-sm-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-2">
              {searchTerm ? (
                <>
                  <div className="css-1of9xbq">
                    <div className="teko-row teko-row-start teko-row-baseline css-iv0lz5">
                      <h1 className="css-7nrxrf">
                        Bạn vừa tìm: {searchTerm}({products.length} sản phẩm)
                      </h1>
                    </div>
                  </div>
                </>
              ) : (
                <RelatedProductFilter total={products.length} />
              )}

              <div className="shop-products-wrapper">
                <div className="css-v6thbz" direction="row">
                  <div height="100%" direction="row" className="css-1k985bk">
                    <div type="subtitle" className="css-1ew3940">
                      Sắp xếp theo:
                    </div>
                    {sortOptions.map((option) => (
                      <div
                        key={option.value}
                        className={
                          selectedSort === option.value
                            ? "css-1ss9yju"
                            : "css-1w3mv8m"
                        }
                        style={{ padding: "0.5rem", marginRight: "1rem" }}
                        onClick={() => handleSortChange(null, option.value)}
                      >
                        <div type="body" className="css-1lchwqw">
                          {option.label}
                        </div>
                        {selectedSort === option.value && (
                          <>
                            <div className="css-u3jq8e"></div>
                            <span className="css-mpv07g">
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {products.length > 0 ? (
                  <>
                    <div className="viewedlist-account">
                      {products.map((item) => {
                        return <FilterItem data={item} />;
                      })}
                    </div>
                    <Pagination
                      count={totalPages}
                      page={filters.page}
                      onChange={handlePageChange}
                      color="primary"
                      showFirstButton
                      showLastButton
                    />
                  </>
                ) : (
                  <>
                    <NotFoundFilter />
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-3 order-2 order-lg-1">
              <div
                className="teko-col teko-col-2 css-17ajfcv"
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                <div className="css-1psc7jy">
                  {/* FILTER PRICE RANGE */}
                  <div className="css-9bznj9">
                    <div className="css-1n5trgy" direction="row">
                      <span className="css-11mfy90">
                        {formatCurrency(filters.min_price)}
                      </span>
                      <span className="css-11mfy90">
                        {formatCurrency(filters.max_price)}
                      </span>
                    </div>
                    <div className="css-1vlfwg">
                      <Box sx={{ width: 230 }}>
                        <Slider
                          size="small"
                          value={[filters.min_price, filters.max_price]}
                          min={0}
                          max={145000000}
                          onChange={handlePriceChange}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                    </div>
                  </div>
                  {/* FILTER BRANDS */}
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
                            name="brand_id"
                            value="1"
                            checked={filters.brand_id.includes("1")}
                            onChange={handleFilterChange}
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
                            name="brand_id"
                            value="2"
                            checked={filters.brand_id.includes("2")}
                            onChange={handleFilterChange}
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
                            value="5"
                            name="brand_id"
                            checked={filters.brand_id.includes("5")}
                            onChange={handleFilterChange}
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
                            value="4"
                            name="brand_id"
                            checked={filters.brand_id.includes("4")}
                            onChange={handleFilterChange}
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
                            value="7"
                            name="brand_id"
                            checked={filters.brand_id.includes("7")}
                            onChange={handleFilterChange}
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
                            value="8"
                            name="brand_id"
                            checked={filters.brand_id.includes("8")}
                            onChange={handleFilterChange}
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
                            value="3"
                            name="brand_id"
                            checked={filters.brand_id.includes("3")}
                            onChange={handleFilterChange}
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
                            value="6"
                            name="brand_id"
                            checked={filters.brand_id.includes("6")}
                            onChange={handleFilterChange}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                            size="small"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="css-1veiyrs">
                    <div
                      width="100%"
                      color="border"
                      className="css-yae08c"
                    ></div>
                  </div>
                  {/* FILTER CPU */}
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
                            value="Core i9"
                            name="cpu"
                            checked={filters.cpu.includes("Core i9")}
                            onChange={handleFilterChange}
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
                            value="Core i7"
                            name="cpu"
                            checked={filters.cpu.includes("Core i7")}
                            onChange={handleFilterChange}
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
                            value="Core i5"
                            name="cpu"
                            checked={filters.cpu.includes("Core i5")}
                            onChange={handleFilterChange}
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
                            value="Core i3"
                            name="cpu"
                            checked={filters.cpu.includes("Core i3")}
                            onChange={handleFilterChange}
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
                            value="Core 7"
                            name="cpu"
                            checked={filters.cpu.includes("Core 7")}
                            onChange={handleFilterChange}
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
                            value="Ryzen 9"
                            name="cpu"
                            checked={filters.cpu.includes("Ryzen 9")}
                            onChange={handleFilterChange}
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
                            value="Ryzen 7"
                            name="cpu"
                            checked={filters.cpu.includes("Ryzen 7")}
                            onChange={handleFilterChange}
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
                            value="Ryzen 5"
                            name="cpu"
                            checked={filters.cpu.includes("Ryzen 5")}
                            onChange={handleFilterChange}
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
                            value="Apple M1"
                            name="cpu"
                            checked={filters.cpu.includes("Apple M1")}
                            onChange={handleFilterChange}
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
                            value="Apple M2"
                            name="cpu"
                            checked={filters.cpu.includes("Apple M2")}
                            onChange={handleFilterChange}
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
                            value="Apple M3"
                            name="cpu"
                            checked={filters.cpu.includes("Apple M3")}
                            onChange={handleFilterChange}
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
                            value="Apple M3 Pro"
                            name="cpu"
                            checked={filters.cpu.includes("Apple M3 Pro")}
                            onChange={handleFilterChange}
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
                            value="Apple M3 Max"
                            name="cpu"
                            checked={filters.cpu.includes("Apple M3 Max")}
                            onChange={handleFilterChange}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                            size="small"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="css-1veiyrs">
                    <div
                      width="100%"
                      color="border"
                      className="css-yae08c"
                    ></div>
                  </div>
                  {/* FILTER RAM */}
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
                            value="8 GB"
                            name="ram"
                            checked={filters.ram.includes("8 GB")}
                            onChange={handleFilterChange}
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
                            value="16 GB"
                            name="ram"
                            checked={filters.ram.includes("16 GB")}
                            onChange={handleFilterChange}
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
                            value="18 GB"
                            name="ram"
                            checked={filters.ram.includes("18 GB")}
                            onChange={handleFilterChange}
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
                            value="32 GB"
                            name="ram"
                            checked={filters.ram.includes("32 GB")}
                            onChange={handleFilterChange}
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
                            value="36 GB"
                            name="ram"
                            checked={filters.ram.includes("36 GB")}
                            onChange={handleFilterChange}
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
                            value="64 GB"
                            name="ram"
                            checked={filters.ram.includes("64 GB")}
                            onChange={handleFilterChange}
                            size="small"
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="css-1veiyrs">
                    <div
                      width="100%"
                      color="border"
                      className="css-yae08c"
                    ></div>
                  </div>
                  {/* FILTER HARDWARE */}
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
                            value="2TB SSD"
                            name="hardware"
                            checked={filters.hardware.includes("2TB SSD")}
                            onChange={handleFilterChange}
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
                            value="SSD 1TB"
                            name="hardware"
                            checked={filters.hardware.includes("SSD 1TB")}
                            onChange={handleFilterChange}
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
                            value="512 GB SSD"
                            name="hardware"
                            checked={filters.hardware.includes("512 GB SSD")}
                            onChange={handleFilterChange}
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
                            value="256 GB SSD"
                            name="hardware"
                            checked={filters.hardware.includes("256 GB SSD")}
                            onChange={handleFilterChange}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                            size="small"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="css-1veiyrs">
                    <div
                      width="100%"
                      color="border"
                      className="css-yae08c"
                    ></div>
                  </div>
                  {/* FILTER SCREEN */}
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
                            value="1.16 inch"
                            name="screen"
                            checked={filters.screen.includes("1.16 inch")}
                            onChange={handleFilterChange}
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
                            value="13.3 inch"
                            name="screen"
                            checked={filters.screen.includes("13.3 inch")}
                            onChange={handleFilterChange}
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
                            value="13.6 inch"
                            name="screen"
                            checked={filters.screen.includes("13.6 inch")}
                            onChange={handleFilterChange}
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
                            value="14.6 inch"
                            name="screen"
                            checked={filters.screen.includes("14.6 inch")}
                            onChange={handleFilterChange}
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
                            value="14.2 inch"
                            name="screen"
                            checked={filters.screen.includes("14.2 inch")}
                            onChange={handleFilterChange}
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
                            value="15.6 inch"
                            name="screen"
                            checked={filters.screen.includes("15.6 inch")}
                            onChange={handleFilterChange}
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
                            value="16 inch"
                            name="screen"
                            checked={filters.screen.includes("16 inch")}
                            onChange={handleFilterChange}
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
                            value="16.1 inch"
                            name="screen"
                            checked={filters.screen.includes("16.1 inch")}
                            onChange={handleFilterChange}
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
                            value="17 inch"
                            name="screen"
                            checked={filters.screen.includes("17 inch")}
                            onChange={handleFilterChange}
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
                            value="17.3 inch"
                            name="screen"
                            checked={filters.screen.includes("17.3 inch")}
                            onChange={handleFilterChange}
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
                            value="18 inch"
                            name="screen"
                            checked={filters.screen.includes("18 inch")}
                            onChange={handleFilterChange}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                            size="small"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* FILTER BUTTON */}
                  {/* <div className="css-1veiyrs">
                    <div
                      width="100%"
                      color="border"
                      className="css-yae08c"
                    ></div>
                  </div>
                  <div className="css-0">
                    <div className="active css-1i3vt0z">
                      <div direction="row" className="css-1skvw03">
                        <div style={{ minWidth: "50%" }}>
                          <Button
                            variant="outlined"
                            onClick={handleFilterSubmit}
                          >
                            Lọc sản phẩm
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
