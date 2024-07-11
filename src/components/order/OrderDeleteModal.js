import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderDeleteModal({ total }) {
  const { token, user } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <Button size="small" variant="outlined">
        Hủy đơn
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent>
          <DialogContentText>
            <div className="teko-modal-content">
              <div className="teko-modal-header">
                <div type="title" className="teko-modal-title css-1cp1h79">
                  Bạn có muốn hủy hóa đơn này
                </div>
              </div>
              <div className="teko-modal-body">
                <div className="css-bx5s07">
                  <div className="teko-row css-1rer2u4">
                    <div className="css-1vjpruz"></div>
                    <button
                      height="1.5rem"
                      className="css-8gkoju"
                      type="button"
                      id="apply-coupon-btn"
                      style={{ marginTop: "9px" }}
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
