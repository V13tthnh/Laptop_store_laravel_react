import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { setDefaultAddress, getDefaultAddress } from "../../api/address";
import useAuthContext from "../../context/AuthContext";
import { showSuccessAlert } from "../../utils/toastify";

export default function AddressRow({ id, data, reLoad }) {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState([]);

  const handleSetDefaultAddress = async () => {
    try {
      await setDefaultAddress(user?.id, { id: data.id });
      reLoad();
      showSuccessAlert("Đã đặt làm mặc định.");
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
      {/* {".css-64rk53 - ko  viền, css-1014eaz - viền xanh "} */}
      <div
        data-content-region-name="shippingAddress"
        data-track-content="true"
        data-content-name="homeDelivery"
        data-content-index="0"
        data-content-target="79"
        class={data.is_default ? "css-1014eaz selected" : "css-64rk53"}
        style={{ height: "100%" }}
        onClick={handleSetDefaultAddress}
      >
        <div>
          <span style={{ fontWeight: "bold", marginRight: "2px" }}>
            {data.full_name}
          </span>
          <div
            data-content-region-name="shippingAddress"
            data-track-content="true"
            data-content-name="editAddress"
            class="css-7kp13n"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              size="20"
              class="css-1e44j4b"
              color="#848788"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.4798 5.35373C14.968 4.86557 15.7594 4.86557 16.2476 5.35373L16.6919 5.79803C17.1801 6.28618 17.1801 7.07764 16.6919 7.56579L16.1819 8.07582L13.9698 5.86375L14.4798 5.35373ZM12.9092 6.92441L6.23644 13.5971L5.68342 16.3622L8.44851 15.8092L15.1212 9.13648L12.9092 6.92441ZM16.707 9.67199L9.3486 17.0304C9.24389 17.1351 9.11055 17.2065 8.96535 17.2355L4.87444 18.0537C4.62855 18.1029 4.37434 18.0259 4.19703 17.8486C4.01971 17.6713 3.94274 17.4171 3.99192 17.1712L4.8101 13.0803C4.83914 12.9351 4.91051 12.8017 5.01521 12.697L13.4192 4.29307C14.4931 3.21912 16.2343 3.21912 17.3083 4.29307L17.7526 4.73737C18.8265 5.81131 18.8265 7.55251 17.7526 8.62645L16.7174 9.66162C16.7157 9.66336 16.714 9.6651 16.7122 9.66683C16.7105 9.66856 16.7088 9.67028 16.707 9.67199ZM3.15918 20.5908C3.15918 20.1766 3.49497 19.8408 3.90918 19.8408H20.2728C20.687 19.8408 21.0228 20.1766 21.0228 20.5908C21.0228 21.005 20.687 21.3408 20.2728 21.3408H3.90918C3.49497 21.3408 3.15918 21.005 3.15918 20.5908Z"
                fill="#82869E"
              ></path>
            </svg>
          </div>
        </div>
        <div>{data.phone}</div>
        <div class="address-info">
          {data.address_detail}, {data.ward}, {data.district}, {data.provinces},
          Việt Nam
        </div>

        {data.is_default && (
          <>
            <div class="css-18wywdr"></div>
            <span className="css-mpv07g">
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  color: "#ffffff",
                  height: "20",
                  width: "20",
                  size: "20",
                }}
              />
            </span>
          </>
        )}
      </div>
    </>
  );
}
