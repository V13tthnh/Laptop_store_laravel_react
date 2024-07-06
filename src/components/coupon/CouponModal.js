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
import { useEffect, useState } from "react";
import CouponItem from "./CouponItem";
import useAuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAvailableCoupons } from "../../api/coupon";

export default function CouponModal({total}) {
  const { token, user } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [discount, setDiscount] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [minimumSpend, setMinimumSpend] = useState(0);

  useEffect(() => {
    fetchAvailableCoupons();
  }, []);

  const handleClickOpen = () => {
    if (!token || !user) {
      toast.error("Bạn cần đăng nhập để thực hiện chức năng này.");
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAvailableCoupons = async () => {
    try {
      const data = await getAvailableCoupons({total: total});
      setCoupons(data.data);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckCoupon = async () => {
    // try {
    //   const response = await api.post("/check-coupon", {
    //     code: couponCode,
    //     minimum_spend: minimumSpend,
    //   });
    //   const data = await response.json();

    //   if (data.success) {
    //     setMessage(data.message);
    //     setDiscount(data.discount);
    //   } else {
    //     setMessage(data.message);
    //     setDiscount(null);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
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
                          />
                        </div>
                        {/* {errors.code && (
                            <p style={{ color: "red" }}>{errors.code}</p>
                          )} */}
                      </Box>
                    </div>
                    <button
                      height="1.5rem"
                      className="css-8gkoju"
                      type="button"
                      id="apply-coupon-btn"
                      style={{ marginTop: "9px" }}
                    >
                      <div type="body">
                        Áp dụng
                      </div>
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
                        return <CouponItem data={item} />;
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
