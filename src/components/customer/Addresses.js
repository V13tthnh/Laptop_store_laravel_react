import ModalAddAddress from "../address/ModalAddAddress";
import LeftSidebar from "./LeftSidebar";
import { getAddresses, getDefaultAddress } from "../../api/address";
import { useEffect, useState } from "react";
import AddressRow from "../address/AddressRow";
import useAuthContext from "../../context/AuthContext";
import DefaultAddress from "../address/DefaultAddress";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../common/LoadingPage";

export default function Addresses() {
  const [addresses, setAddresses] = useState();
  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState();
  const { user, token } = useAuthContext();
  const navigator = useNavigate();

  useEffect(() => {
    if (!token) {
      navigator("/login");
      setTimeout(() => {
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
      }, 1000);
      return;
    }

    loadAddresses();
    loadDefaultAddress();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await getAddresses(user?.id);
      setAddresses(data.data);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadDefaultAddress = async () => {
    try {
      const data = await getDefaultAddress(user?.id);
      setDefaultAddress(data.data);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }
  };

  const handleReload = (message) => {
    loadAddresses();
    loadDefaultAddress();
    toast.success(message);
  };

  const handleReloadDefaultAddress = (message) => {
    loadDefaultAddress();
    toast.success("Đã đặt làm mặc định.");
  }

  const handleReDeleteAddress = () => {
    toast.success("Đã xóa địa chỉ.");
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> 
      {addresses ? (
        <>
          <div className="page-section mb-60">
            <div className="container">
              <section className="wrapper">
                <LeftSidebar />
                <div className="right">
                  <div className="profile">
                    <div className="box-heading">
                      <div className="line-title">
                        <h2>Sổ địa chỉ</h2>
                        <ModalAddAddress onAddSuccess={handleReload} />
                      </div>
                    </div>
                    <div className="address-area">
                      <div className="box-info-account">
                        <div id="address_tables" className="address_table_list">
                          {defaultAddress && (
                            <DefaultAddress data={defaultAddress} onReload={handleReload}/>
                          )}

                          <div className="address_table">
                            <div
                              id="view_address_10186206327"
                              className="customer_address"
                            >
                              {addresses &&
                                addresses.map((item) => {
                                  return <AddressRow data={item} onReload={handleReload} deleteReload={handleReDeleteAddress}/>;
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </>
  );
}
