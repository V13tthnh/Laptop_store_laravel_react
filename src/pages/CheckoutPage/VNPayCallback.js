import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/slices/CartSlice";
import useAuthContext from "../../context/AuthContext";
import { clearCoupon } from "../../redux/slices/CouponSlice";
import { showSuccessAlert } from "../../utils/toastify";

export default function VnPayCallback() {
  const params = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useAuthContext();

  const search = new URLSearchParams(params.search);
  const vnp_ResponseCode = search.get("vnp_ResponseCode");
  const locationVNP = useLocation();
  useEffect(() => {
    if (vnp_ResponseCode === "00") {
      axios
        .get(`http://127.0.0.1:8000/api/vnp/callback${locationVNP.search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            dispatch(clearCart());
            dispatch(clearCoupon());
            showSuccessAlert("Thanh toán thành công, cảm ơn bạn đã mua hàng.");
            setTimeout(() => {
              navigate(`/bill/order/${res.data.order_id}`);
            }, 1200);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [token]);
}
