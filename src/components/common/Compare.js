import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCompare } from "../../redux/slices/ProductCompareSlice";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";

export default function Compare(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.compare.items);

  const handleAddToCompare = (product) => {
    if(products){
      if(products.length > 3){
        showFailedAlert("Chỉ được so sánh tối đa 3 sản phẩm.");
        return;
      }
    }
    dispatch(addProductToCompare(product));
    showSuccessAlert("Đã thêm vào so sánh.")
  };

  return (
    <>
      <a href="#" onClick={() => handleAddToCompare(props?.data)}>
        <FontAwesomeIcon icon={faCirclePlus} color="#2f80ed" size="lg" />
        <small style={{ color: "#2f80ed", padding: "3px" }}>So sánh</small>
      </a>
    </>
  );
}
