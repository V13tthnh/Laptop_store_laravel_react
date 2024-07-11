import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  Box,
} from "@mui/material";
import "./CouponModal.css";
import { useEffect, useRef, useState } from "react";
import CouponItem from "./CouponItem";
import useAuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAvailableCoupons, getApplyCoupon } from "../../api/coupon";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon } from "../../redux/slices/CouponSlice";

export default function CouponModal({ total }) {
  const { token, user } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyCode, setApplyCode] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.coupon.items);

  const handleApplyCodeChange = (e) => {
    setApplyCode(e.target.value);
  };

  useEffect(() => {
    fetchAvailableCoupons();
    calculateTotal(cartItems);
  }, [cartItems]);

  const handleClickOpen = () => {
    if (!token || !user) {
      toast.error("Bạn cần đăng nhập để thực hiện chức năng này.");
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, product) => {
      return total + parseToNumber(product.unit_price) * product.quantity;
    }, 0);
  };

  const parseToNumber = (num) => {
    if (typeof num === "number") {
      return num;
    }
    if (typeof num === "string") {
      const numberStr = num.replace(/\./g, "").replace(" vnđ", "");
      const number = parseFloat(numberStr);
      return number;
    }
    return NaN;
  };

  const handleClose = () => {
    setApplyCode("");
    setOpen(false);
  };

  const fetchAvailableCoupons = async () => {
    try {
      const data = await getAvailableCoupons({ total: total });
      setCoupons(data.data);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await getApplyCoupon({ code: applyCode });

      dispatch(
        applyCoupon({
          code: response.data.code,
          value: response.data.value,
          description: response.data.description,
          minimum_spend: response.data.minimum_spend,
          end_date: response.data.end_date,
          type: response.data.type,
        })
      );
      toast.success("Đã áp dụng mã giảm giá.");
      handleClose();
      setApplyCode("");
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
      <Button onClick={handleClickOpen} size="small">
        Chọn hoặc nhập khuyến mãi
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent>
          <DialogContentText>
            <div className="teko-modal-content">
              <div className="teko-modal-header">
                <div type="title" className="teko-modal-title css-1cp1h79">
                  Khuyến mãi và mã giảm giá
                </div>
              </div>
              <div className="teko-modal-body">
                <div className="css-bx5s07">
                  <div className="teko-row css-1rer2u4">
                    <div className="css-1vjpruz">
                      <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "40ch" },
                        }}
                      >
                        <div>
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Nhập mã giảm giá"
                            maxRows={12}
                            size="small"
                            value={applyCode}
                            onChange={handleApplyCodeChange}
                          />
                        </div>
                      </Box>
                    </div>
                    <button
                      height="1.5rem"
                      className="css-8gkoju"
                      type="button"
                      id="apply-coupon-btn"
                      style={{ marginTop: "9px" }}
                      onClick={handleApplyCoupon}
                    >
                      <div type="body">Áp dụng</div>
                      <span style={{ marginLeft: "0px" }}>
                        <div className="css-157jl91"></div>
                      </span>
                    </button>
                  </div>
                  <div className="teko-row teko-row-start css-1n9015d">
                    <div type="subtitle" color="black" className="css-1j2lgm2">
                      Mã giảm giá
                    </div>
                    {coupons &&
                      coupons.map((item) => {
                        return (
                          <CouponItem data={item} closeModal={handleClose} />
                        );
                      })}
                    <div className="css-apomyl"></div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
