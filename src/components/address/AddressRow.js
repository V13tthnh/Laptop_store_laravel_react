import { Button } from "@mui/material";
import ModalEditAddress from "./ModalEditAddress";
import { deleteAddress, setDefaultAddress } from "../../api/address";
import { useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { showSuccessAlert } from "../../utils/toastify";

export default function AddressRow({ data, onReload, deleteReload }) {
  const [errors, setErrors] = useState("");
  const { user } = useAuthContext();

  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(data.id);
      onReload();
      deleteReload();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Failed to add address" });
      }
    }
  };

  const handleSetDefaultAddress = async () => {
    try {
      await setDefaultAddress(user?.id, { id: data.id });
      onReload();
      showSuccessAlert("Đã đặt làm địa chỉ mặc định.");
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
      <div className="address_wrap">
        <div className="colright view_address">
          <div className="line">
            <p>
              <span className="name_address">{data.full_name}</span>
              <span className="phone_address">{data.phone}</span>
            </p>
          </div>

          <div className="line">
            <p className="address1">
              {data.address_detail}, {data.ward},{data.district},{" "}
              {data.provinces}, Việt Nam
            </p>
          </div>
        </div>
        <div className="colleft">
          <div className="address_actions">
            {/* <span className="action_edit">
              <ModalEditAddress data={data} onReload={onReload} />
            </span> */}
            <span className="action_delete">
              <Button
                style={{ color: "red" }}
                onClick={handleDeleteAddress}
                value={data.id}
                className="js-delete-customer"
              >
                Xoá
              </Button>
            </span>
            <span className="action_setup_df">
              <Button
                size="sm"
                value={data.id}
                className="js-setdefault-customer"
                onClick={handleSetDefaultAddress}
              >
                Thiết lập mặc định
              </Button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
