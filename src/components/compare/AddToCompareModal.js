import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addProductToCompare } from "../../redux/slices/ProductCompareSlice";
import useDebounce from "../../hooks/debounce";
import api from "../../api/api";
import ProductDropdown from "../common/ProductDropdown";
import SearchProductList from "./SearchProductList";
import Compare from "../common/Compare";

export default function AddToCompareModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const viewedProducts = useSelector((state) => state.viewed.items);
  const wishlistProducts = useSelector((state) => state.wishlist.items);
  const [search, setSearch] = useState();
  const [searchValue, setSearchValue] = useState([]);

  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      api
        .get(`/laptop/search/${debouncedSearch}`)
        .then((res) => setSearchValue(res.data.data))
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  }, [debouncedSearch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCompare = (product) => {
    dispatch(addProductToCompare(product));
    toast.success("Đã thêm vào mục so sánh.");
  };

  return (
    <>
      <ToastContainer />

      <li className="productid-0" onClick={handleClickOpen}>
        <div className="addsp-cp">
          <div className="plus">
            <i></i>
          </div>
          <span>Thêm sản phẩm</span>
        </div>
      </li>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <DialogContentText>
            <div className="popup-addsp" style={{ display: "block" }}>
              <div className="bg-popup"></div>
              <div className="close-popup" onClick={handleClose}>
                <aside>
                  <i></i>
                  <span>Đóng</span>
                </aside>
              </div>
              <div className="compare-popup">
                <h4>Hoặc nhập tên để tìm</h4>
                <form id="searchproductcompare" onsubmit="return false">
                  <div className="find-sp">
                    <input
                      type="text"
                      placeholder="Nhập tên laptop để tìm"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <i className="icon-findcp"></i>
                  </div>
                  <SearchProductList products={searchValue} show={search ? true : false}/>
                </form>
                <div className="scroll-container">
                  <h4>Đã xem gần nhất</h4>
                  <ul className="pro-compare pro-compare_viewed">
                    {viewedProducts &&
                      viewedProducts.map((product) => {
                        return (
                          <>
                            <li className="productitem-sale productid-263983 cate-44">
                              <NavLink to={`/laptop/${product.slug}`}>
                                <div className="item-label"></div>
                                <div className="item-img item-img_44">
                                  <img
                                    className=" thumb"
                                    src={
                                      product.images
                                        ? `http://localhost:8000/${product.images[0]?.url}`
                                        : product.first_image
                                        ? `http://localhost:8000/${product.first_image?.url}`
                                        : product.image
                                    }
                                    alt={product.name}
                                  />
                                </div>
                                <h3>{product.name}</h3>
                                <strong className="price">
                                  {product.unit_price}
                                </strong>
                              </NavLink>
                              <Compare data={product} />
                            </li>
                          </>
                        );
                      })}
                  </ul>
                  <h4>
                    Danh sách yêu thích
                    <i className="iconcompare-fire"></i>
                  </h4>
                  <ul className="pro-compare pro-compare_sale">
                    {wishlistProducts &&
                      wishlistProducts.map((product) => {
                        return (
                          <>
                            <li className="productitem-sale productid-263983 cate-44">
                              <NavLink to={`/laptop/${product.slug}`}>
                                <div className="item-label"></div>
                                <div className="item-img item-img_44">
                                  <img
                                    className=" thumb"
                                    src={
                                      product.images
                                        ? `http://localhost:8000/${product.images[0]?.url}`
                                        : product.first_image
                                        ? `http://localhost:8000/${product.first_image?.url}`
                                        : product.image
                                    }
                                    alt={product.name}
                                  />
                                </div>
                                <h3>{product.name}</h3>
                                <strong className="price">
                                  {product.unit_price}
                                </strong>
                              </NavLink>
                              <Compare data={product} />
                            </li>
                          </>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
