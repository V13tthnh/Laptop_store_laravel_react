import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/slices/CartSlice";
import useAuthContext from "../../context/AuthContext";
import { clearCoupon } from "../../redux/slices/CouponSlice";

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
            toast.success("Cảm ơn bạn đã mua hàng.");
            setTimeout(() => {
              navigate("/account/orders");
            }, 3000);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [token]);
}
