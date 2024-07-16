import React from "react";
import { useToast } from "../../hooks/useToast";

const MyToast = () => {
  const { showToast, closeToast, toastMessage, isOpen, toastType } = useToast();

  const handleShowToast = () => {
    showToast("Thông báo mẫu từ hook!", "success");
  };

  let toastClassName = "toast-container"; // Class CSS chung cho toast

  switch (toastType) {
    case "success":
      toastClassName += " success-toast";
      break;
    case "error":
      toastClassName += " error-toast";
      break;
    case "warning":
      toastClassName += " warning-toast";
      break;
    default:
      toastClassName += " info-toast";
      break;
  }

  return (
    <div>
      <button onClick={handleShowToast}>Hiển thị Toast</button>
      {isOpen && (
        <div className={toastClassName}>
          <span className="toast-icon">
            {toastType === "success" ? "✔️" : "ℹ️"}
          </span>
          <span className="toast-message">{toastMessage}</span>
          <button onClick={closeToast} className="toast-close-button">
            Đóng
          </button>
        </div>
      )}
    </div>
  );
};

export default MyToast;
