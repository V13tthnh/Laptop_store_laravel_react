import { Box, Button } from "@mui/material";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../BillPage/BillPage.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getOrderDetail } from "../../api/order";
import useAuthContext from "../../context/AuthContext";
import LoadingPage from "../../components/common/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function BillPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [orderDetail, setOrderDetail] = useState(false);

  useEffect(() => {
    handleGetOrderDetail(id);
  }, [id]);

  const handleGetOrderDetail = async (id) => {
    try {
      setLoading(true);
      const response = await getOrderDetail({ order_id: id });
      setOrderDetail(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const parseToNumber = (num) => {
    if (typeof num === "number") {
      return num;
    }
    if (typeof num === "string") {
      const numberStr = num.replace(/\./g, "").replace(" ₫", "");
      const number = parseFloat(numberStr);
      return number;
    }
  };

  const formatCurrency = (total) => {
    if (total === null || total === undefined) {
      return "0 vnđ";
    }
    return total.toLocaleString("vi-VN") + " ₫";
  };

  const handleDownload = () => {
    const invoiceElement = document.getElementById("invoice");
    const invoiceHtml = invoiceElement.outerHTML;
    const blob = new Blob([invoiceHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadExcel = () => {
    if (!orderDetail) return;
    const csvContent = `
      Invoice ID,${orderDetail.id}\n
      Date,${new Date(orderDetail.created_at).toLocaleDateString()}\n
      Total,${orderDetail.total} VND\n
      \n
      Product ID,Product Name,Quantity,Price,Total\n
      ${orderDetail.products
        .map(
          (product) =>
            `${product.id},${product.name},${product.quantity},${product.unit_price},${product.total}`
        )
        .join("\n")}
    `;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const invoiceElement = document.getElementById("invoice");
    const invoiceHtml = invoiceElement.outerHTML;
    const blob = new Blob([invoiceHtml], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }
  console.log(orderDetail);
  return (
    <>
      <Header />
      {orderDetail && (
        <>
          <section id="invoice" style={{ background: "#fff" }}>
            <div className="container my-5 py-5">
              <div className="invoice-btn">
                <NavLink to="/">
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Tiếp tục mua
                  hàng
                </NavLink>

                {/* <Button
                  variant="outlined"
                  onClick={handleDownloadExcel}
                  style={{ marginLeft: "730px" }}
                >
                  Tải xuống
                </Button> */}
                <Button
                  variant="outlined"
                  onClick={handlePrint}
                  style={{ marginLeft: "900px" }}
                >
                  In hóa đơn
                </Button>
              </div>
              <div className="text-center border-top border-bottom my-5 py-3">
                <h2 className="display-5 fw-bold">Hóa đơn bán hàng </h2>
                <p className="m-0">Hóa đơn: {orderDetail.id}</p>
                <p className="m-0">Ngày mua: {orderDetail.created_at}</p>
              </div>
              <div className="d-md-flex justify-content-between">
                <div>
                  <h4>Laptop thành nghĩa</h4>
                  <ul className="list-unstyled">
                    <li>Laptop giá rẻ</li>
                    <li>thanhnghialaptop@gmail.com</li>
                    <li>347/10 Trường Chinh</li>
                  </ul>
                </div>
                <div className="mt-5 mt-md-0">
                  <h4>{orderDetail?.user?.full_name}</h4>
                  <ul className="list-unstyled">
                    <li>
                      <b>SĐT:</b> {orderDetail?.user?.phone}
                    </li>
                    <li>
                      <b>Email:</b> {orderDetail?.user?.email}
                    </li>
                    <li>
                      <b>Địa chỉ:</b> {orderDetail?.address?.address_detail}, {orderDetail?.address?.ward},
                       {orderDetail?.address?.district}, {orderDetail?.address?.provinces}
                    </li>
                    <li>
                      <b>phương thức:</b>
                      {orderDetail.formality === 1 ? "VNPay" : "Tiền mặt"}
                    </li>
                  </ul>
                </div>
              </div>

              <table className="table border my-5">
                <thead>
                  <tr className="bg-primary-subtle">
                    <th scope="col">#</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail?.products?.map((item, index) => {
                    return (
                      <>
                        <tr
                          style={{ textAlign: "center", alignItems: "center" }}
                        >
                          <th scope="row">{index}</th>
                          <td>
                            <img
                              src={`http://127.0.0.1:8000/${item.first_image.url}`}
                              alt={item.name}
                              style={{ width: "120px", height: "120px" }}
                            />
                            {item.name}
                          </td>
                          <td>{formatCurrency(item.pivot.price)}</td>
                          <td>{item.pivot.quantity}</td>
                          <td>
                            {formatCurrency(
                              parseToNumber(item.pivot.price) *
                                item.pivot.quantity
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}

                  <tr>
                    <th></th>
                    <td></td>
                    <td></td>
                    <td className="">
                      <b>Tạm tính:</b>
                    </td>
                    <td>{formatCurrency(orderDetail.subtotal)}</td>
                  </tr>
                  <tr>
                    <th></th>
                    <td></td>
                    <td></td>
                    <td className="">
                      <b>Giảm giá:</b>
                    </td>
                    <td>{formatCurrency(orderDetail.discount)}</td>
                  </tr>
                  <tr>
                    <th></th>
                    <td></td>
                    <td></td>
                    <td className="fw-bold">
                      <b>Tổng thực tế:</b>
                    </td>
                    <td className="text-danger fw-bold">{orderDetail.total}</td>
                  </tr>
                </tbody>
              </table>

              <div className=" my-5">
                <p className="text-muted">
                  <span className="fw-semibold">Ghi chú: </span>{" "}
                  {orderDetail.note}
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
