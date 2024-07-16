import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import useAuthContext from "../../context/AuthContext";
import { storeReview } from "../../api/review";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";

export default function AddReviewModal({ url, id }) {
  const { token, user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [form, setForm] = useState({
    user_id: user?.id,
    product_id: id,
    comment: "",
    rating: 0,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setForm({
      ...form,
      rating,
    });
  };

  const handleSubmit = async () => {
    try {
      await storeReview(form);
      setForm({ comment: "", rating: null });
      showSuccessAlert(
        "Đánh giá của bạn đã được gửi cho quản trị viên và sẽ được duyệt trong 24 giờ."
      );
      handleClose();
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Gửi đánh giá thất bại" });
      }
    }
    setSelectedRating(null);
  };

  const handleClickOpen = () => {
    if (!token) {
      showFailedAlert("Bạn cần đăng nhập để viết đánh giá.");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="btn-detail btn-short-spec not-have-instruction"
        style={{ marginLeft: "100px" }}
      >
        <span>
          <FontAwesomeIcon icon={faPen} size="sm" /> Gửi đánh giá của bạn
        </span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div class="popup-rating-topzone" style={{ display: "block" }}>
              <div class="close-rate" onClick={handleClose}></div>
              <p class="txt">Đánh giá sản phẩm</p>
              <div class="bproduct">
                <div class="img">
                  <img
                    src={`http://localhost:8000/${url}`}
                    alt="Laptop Asus Vivobook Go 15 E1504FA R5 7520U/16GB/512GB/Chuột/Win11 (NJ776W)"
                  />
                </div>

                <h3>
                  Laptop Asus Vivobook Go 15 E1504FA R5
                  7520U/16GB/512GB/Chuột/Win11 (NJ776W)
                </h3>
              </div>
              <ul class="rating-topzonecr-star">
                {[1, 2, 3, 4, 5].map((value) => (
                  <li
                    key={value}
                    data-val={value}
                    onClick={() => handleStarClick(value)}
                    className={selectedRating >= value ? "active" : ""}
                  >
                    <i
                      className={`iconcmt-unstarlist ${
                        selectedRating >= value ? "active" : ""
                      }`}
                    ></i>
                    <p
                      data-val={value}
                      className={selectedRating === value ? "active-slt" : ""}
                    >
                      {value === 1
                        ? "Rất tệ"
                        : value === 2
                        ? "Tệ"
                        : value === 3
                        ? "Tạm ổn"
                        : value === 4
                        ? "Tốt"
                        : "Rất tốt"}
                    </p>
                  </li>
                ))}
              </ul>
              <form action="" class="form-rate">
                <div class="inputrating__group">
                  <textarea
                    class="fRContent"
                    name="comment"
                    placeholder="Mời bạn chia sẻ thêm cảm nhận..."
                    onChange={handleInputChange}
                  ></textarea>

                  <div class="txtcount__box">
                    <span class="ct" style={{ display: "none" }}>
                      0 chữ
                    </span>
                  </div>
                </div>

                <div class="dcap">
                  <button
                    type="button"
                    id="submitrt"
                    class="submit send-rate "
                    onClick={handleSubmit}
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </form>
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
