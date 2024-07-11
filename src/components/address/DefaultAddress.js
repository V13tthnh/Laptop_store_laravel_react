import { Button } from "@mui/material";
import ModalEditAddress from "./ModalEditAddress";
import { deleteAddress, updateAddress } from "../../api/address";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function DefaultAddress({ data, onReload }) {
  const [errors, setErrors] = useState();
  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(data?.id);
      onReload();
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="address_table default">
        <div id="view_address_10186101925" className="customer_address">
          <div className="address_wrap">
            <div className="colright view_address">
              <div className="line">
                <p>
                  <span className="default_address note">Mặc định</span>
                  <span className="name_address">{data?.full_name}</span>
                </p>
              </div>
              <div className="line">
                <p>
                  {data.address_detail},{data.ward},{data.district},
                  {data.provinces}, Việt Nam
                </p>
              </div>
            </div>
            <div className="colleft">
              <div className="address_actions">
                <span className="action_edit">
                  <ModalEditAddress data={data} onReload={onReload} />
                </span>
                <span className="action_delete">
                  <Button
                    style={{ color: "red" }}
                    onClick={handleDeleteAddress}
                    className="js-delete-customer"
                  >
                    Xoá
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
