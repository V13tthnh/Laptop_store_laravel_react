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
import "react-toastify/dist/ReactToastify.css";
import { getAvailableCoupons, getApplyCoupon } from "../../api/coupon";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon } from "../../redux/slices/CouponSlice";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";

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
    let objRequest = { total: total, user_id: user?.id };
    fetchAvailableCoupons(objRequest);
    calculateTotal(cartItems);
  }, [cartItems, total, user?.id]);

  const handleClickOpen = () => {
    if (!token || !user) {
      showFailedAlert("vui lòng đăng nhập lại.");
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

  const fetchAvailableCoupons = async (objRequest) => {
    try {
      const data = await getAvailableCoupons(objRequest);
      setCoupons(data.data);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await getApplyCoupon({
        code: applyCode,
        total: total,
        user_id: user?.id,
      });
      console.log(response.status);
      if (response.status) {
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
        showSuccessAlert("Đã áp dụng mã giảm giá.");
        handleClose();
        setApplyCode("");
      } else {
        showFailedAlert(response.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Failed to add address" });
      }
    }
  };

  console.log(coupons);

  return (
    <>
      <Button onClick={handleClickOpen} size="small">
        Chọn hoặc nhập mã
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent>
          <DialogContentText>
            <div className="teko-modal-content">
              <div className="teko-modal-header">
                <div type="title" className="teko-modal-title css-1cp1h79">
                  Mã giảm giá
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
                    {Array.isArray(coupons) ? (
                      coupons.map((item) => {
                        return (
                          <CouponItem
                            key={item.id}
                            data={item}
                            closeModal={handleClose}
                          />
                        );
                      })
                    ) : (
                      <CouponItem
                        key={coupons.id}
                        data={coupons}
                        closeModal={handleClose}
                      />
                    )}
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
