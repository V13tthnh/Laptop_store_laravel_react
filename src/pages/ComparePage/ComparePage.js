import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../ComparePage/ComparePage.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ListProductCompare from "../../components/compare/ListPoductCompare";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../redux/slices/CartSlice";
import { useEffect, useState } from "react";

export default function ComparePage() {
  const products = useSelector((state) => state.compare.items);
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [product3, setProduct3] = useState(null);
  const [showDifferences, setShowDifferences] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      setProduct1(null);
      setProduct2(null);
      setProduct3(null);
    } else if (products.length === 1) {
      setProduct1(products[0]);
      setProduct2(null);
      setProduct3(null);
    } else if (products.length === 2) {
      setProduct1(products[0]);
      setProduct2(products[1]);
      setProduct3(null);
    } else if (products.length === 3) {
      setProduct1(products[0]);
      setProduct2(products[1]);
      setProduct3(products[2]);
    }
  }, [products]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: `http://localhost:8000/${product.images[0]?.url}`,
        product_specification_detail: product.product_specification_details,
        quantity: 1,
        unit_price: product.unit_price,
        sale_price: product.sale_price,
        availableQuantity: product.quantity,
      })
    );
    successNotify(`Đã thêm sản phẩm vào giỏ hàng.`);
  };

  const handleCheckboxChange = () => {
    setShowDifferences(!showDifferences);
  };

  const renderComparison = (index) => {
    if (!showDifferences) {
      return true;
    }

    const value1 = product1?.product_specification_details?.[index]?.value;
    const value2 = product2?.product_specification_details?.[index]?.value;
    const value3 = product3?.product_specification_details?.[index]?.value;

    return !(value1 === value2 && value2 === value3);
  };

  const successNotify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "Bounce",
    });
  };

  return (
    <>
      <Header />
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
      <div class="breadcrumb-content" style={{ marginLeft: "320px" }}>
        <ul>
          <li>
            <NavLink to="/">
              <FontAwesomeIcon icon={faHome} size="sm" /> Trang chủ
            </NavLink>
          </li>

          <li>
            <NavLink to={`/laptops/compare`}>So sánh thông số</NavLink>
          </li>
        </ul>
      </div>

      <section className="site_1">
        <ListProductCompare
          data={products}
          showDifferencesOnChange={handleCheckboxChange}
          showDifferencesCheck={showDifferences}
        />

        {/* SO SÁNH NHANH */}
        <div className="box-detailcp overview">
          <div className="titleoverview">
            <i className="iconcompare-circlearrow"></i>
            <strong>So sánh nhanh</strong>
            <i className="iconcompare-star"></i>
          </div>
          <div className="htmloverview" style={{}}>
            <aside>
              <p>So sánh nhanh</p>
            </aside>
            {products &&
              products.map((item) => {
                return (
                  <>
                    <aside className="productid-322269">
                      <p className="tooltip-compare ">
                        <b>CPU: </b>
                        {item.product_specification_details?.[0]?.value}
                      </p>
                      <p className="tooltip-compare ">
                        <b>RAM: </b>
                        {item.product_specification_details?.[6]?.value},
                        {item.product_specification_details?.[7]?.value}
                      </p>
                      <p className="tooltip-compare ">
                        <b>Ổ cứng:</b>
                        {item.product_specification_details?.[10]?.value}
                      </p>
                      <p className="tooltip-compare ">
                        <b>Màn hình: </b>
                        {item.product_specification_details?.[11]?.value},
                        {item.product_specification_details?.[12]?.value},
                        {item.product_specification_details?.[13]?.value}
                      </p>
                      <p className="tooltip-compare ">
                        <b>Card màn hình: </b>
                        {item.product_specification_details?.[16]?.value}
                      </p>
                    </aside>
                  </>
                );
              })}
          </div>
        </div>

        <div className="fullspecs">
          <div className="parameter-cp col2">
            {/* BỘ XỬ LÝ */}
            <div className="box-detailcp technologi" group-id="32">
              <div className="titletechnologi">
                <i className="iconcompare-circlearrow"></i>
                <strong>Bộ xử lý</strong>
              </div>
              <div className="listtechnologi" style={{}}>
                {/* <div className="part-detail" id="92">
                  <div className="boxDesktop">
                    <aside className={`hasprod`}>
                      <p>
                        <span>Công nghệ CPU</span>
                      </p>
                    </aside>
                    {product1 && (
                      <aside id="322269" className={`hasprod `}>
                        <p className="prop prop143794 " data-compare="200">
                          {product1.product_specification_details?.[0]?.value}
                        </p>
                      </aside>
                    )}
                    {product2 && (
                      <aside id="322269" className={`hasprod `}>
                        <p className="prop prop143794 " data-compare="200">
                          {product2.product_specification_details?.[0]?.value}
                        </p>
                      </aside>
                    )}
                    {product3 && (
                      <aside id="322269" className={`hasprod `}>
                        <p className="prop prop143794 " data-compare="200">
                          {product3.product_specification_details?.[0]?.value}
                        </p>
                      </aside>
                    )}
                  </div>
                </div> */}
                {renderComparison(0) && (
                  <div className="part-detail" id="92">
                    <div className="boxDesktop">
                      <aside className="hasprod">
                        <p>
                          <span>Công nghệ CPU</span>
                        </p>
                      </aside>
                      {product1 && (
                        <aside id="product1" className="hasprod">
                          <p className="prop prop143794">
                            {product1.product_specification_details?.[0]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside id="product2" className="hasprod">
                          <p className="prop prop143794">
                            {product2.product_specification_details?.[0]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside id="product3" className="hasprod">
                          <p className="prop prop143794">
                            {product3.product_specification_details?.[0]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}

                {renderComparison(1) && (
                  <div className="part-detail" id="28859">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Số nhân</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269 highlight"
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product1.product_specification_details?.[1]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[1]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[1]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}

                {renderComparison(2) && (
                  <div className="part-detail" id="28860">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Số luồng</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product1.product_specification_details?.[2]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[2]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[2]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(3) && (
                  <div className="part-detail" id="93">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Tốc độ CPU</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product1.product_specification_details?.[3]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[3]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[3]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(4) && (
                  <div className="part-detail" id="97">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Tốc độ tối đa</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product1.product_specification_details?.[4]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[4]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[4]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(5) && (
                  <div className="part-detail" id="28861">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Bộ nhớ đệm</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product1.product_specification_details?.[5]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[5]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[5]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* BỘ NHỚ RAM, Ổ CỨNG */}
            <div className="box-detailcp technologi" group-id="34">
              <div className="titletechnologi">
                <i className="iconcompare-circlearrow"></i>
                <strong>Bộ nhớ RAM, Ổ cứng</strong>
              </div>
              <div className="listtechnologi" style={{}}>
                {renderComparison(6) && (
                  <div className="part-detail" id="146">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>RAM</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p
                            className="prop prop143794 same"
                            data-compare="200"
                          >
                            {product1.product_specification_details?.[6]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[6]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[6]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(7) && (
                  <div className="part-detail" id="149">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Loại RAM</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product1.product_specification_details?.[7]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[7]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[7]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(8) && (
                  <div className="part-detail" id="155">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Tốc độ Bus RAM</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product1.product_specification_details?.[8]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product2.product_specification_details?.[8]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {product3.product_specification_details?.[8]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(9) && (
                  <div className="part-detail" id="92">
                    <div className="boxDesktop">
                      <aside className="hasprod">
                        <p>
                          <span>Công nghệ CPU</span>
                        </p>
                      </aside>
                      {product1 && (
                        <aside id="product1" className="hasprod">
                          <p className="prop prop143794">
                            {product1.product_specification_details?.[9]?.value}
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside id="product2" className="hasprod">
                          <p className="prop prop143794">
                            {product2.product_specification_details?.[9]?.value}
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside id="product3" className="hasprod">
                          <p className="prop prop143794">
                            {product3.product_specification_details?.[9]?.value}
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(10) && (
                  <div className="part-detail" id="184">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Ổ cứng</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[10]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[10]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[10]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* MÀN HÌNH */}
            <div className="box-detailcp technologi" group-id="52">
              <div className="titletechnologi">
                <i className="iconcompare-circlearrow"></i>
                <strong>Màn hình</strong>
              </div>
              <div className="listtechnologi">
                {renderComparison(11) && (
                  <div className="part-detail" id="187">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Màn hình</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[11]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[11]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[11]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(12) && (
                  <div className="part-detail" id="189">
                    <input type="hidden" name="listIdSame" value="37836" />
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Độ phân giải</span>
                        </p>
                      </aside>
                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[12]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[12]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[12]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(13) && (
                  <div className="part-detail" id="29056">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Tần số quét</span>
                        </p>
                      </aside>
                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[13]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[13]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[13]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}

                {renderComparison(14) && (
                  <div className="part-detail" id="41425">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Độ phủ màu</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[14]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[14]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[14]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(15) && (
                  <div className="part-detail" id="186">
                    <input
                      type="hidden"
                      name="listIdSame"
                      value="63600,184138"
                    />
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Công nghệ màn hình</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[15]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[15]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[15]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* ĐỒ HỌA VÀ ÂM THANH */}
            <div className="box-detailcp technologi" group-id="53">
              <div className="titletechnologi">
                <i className="iconcompare-circlearrow"></i>
                <strong>Đồ họa và Âm thanh</strong>
              </div>
              <div className="listtechnologi" style={{}}>
                {renderComparison(16) && (
                  <div className="part-detail" id="191">
                    <input type="hidden" name="listIdSame" value="259811" />
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Card đồ họa</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[16]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[16]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[16]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(17) && (
                  <div className="part-detail" id="196">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Công nghệ âm thanh</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[17]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[17]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[17]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* CỔNG KẾT NỐI VÀ TÍNH NĂNG MỞ RỘNG */}
            <div className="box-detailcp technologi" group-id="56">
              <div className="titletechnologi">
                <i className="iconcompare-circlearrow"></i>
                <strong>Cổng kết nối &amp; tính năng mở rộng</strong>
              </div>
              <div className="listtechnologi">
                {renderComparison(18) && (
                  <div className="part-detail" id="200">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Cổng giao tiếp</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[18]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[18]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[18]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(19) && (
                  <div className="part-detail" id="206">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Kết nối không dây</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[19]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[19]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[19]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(20) && (
                  <div className="part-detail" id="223">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Webcam</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[20]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[20]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[20]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(23) && (
                  <div className="part-detail" id="201">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Tính năng khác</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[23]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[23]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[23]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(22) && (
                  <div className="part-detail" id="10741">
                    <input type="hidden" name="listIdSame" value="" />
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Đèn bàn phím</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[22]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[22]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[22]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* KÍCH THƯỚC, KHỐI LƯỢNG */}
            <div className="box-detailcp technologi" group-id="62">
              <div className="titletechnologi">
                <i className="iconcompare-circlearrow"></i>
                <strong>Kích thước &amp; khối lượng</strong>
              </div>
              <div className="listtechnologi">
                {renderComparison(24) && (
                  <div className="part-detail" id="255">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Kích thước & Khối lượng </span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[24]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[24]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[24]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(25) && (
                  <div className="part-detail" id="7903">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Chất liệu</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[25]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[25]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[25]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* THÔNG TIN KHÁC */}
            <div className="box-detailcp technologi" group-id="60">
              <div className="titletechnologi">
                <i className="iconcompare-circlearrow"></i>
                <strong>Thông tin khác</strong>
              </div>
              <div className="listtechnologi">
                {renderComparison(26) && (
                  <div className="part-detail" id="228">
                    <input type="hidden" name="listIdSame" value="" />
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Thông tin Pin</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[26]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[26]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[26]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(27) && (
                  <div className="part-detail" id="40260">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Công suất bộ sạc</span>
                        </p>
                      </aside>
                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[27]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[27]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[27]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(28) && (
                  <div className="part-detail" id="8599">
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Hệ điều hành</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[28]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[28]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[28]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
                {renderComparison(31) && (
                  <div className="part-detail" id="22711">
                    <input type="hidden" name="listIdSame" value="0" />
                    <div className="boxDesktop">
                      <aside className="hasprod ">
                        <p>
                          <span>Thời điểm ra mắt</span>
                        </p>
                      </aside>

                      {product1 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product1.product_specification_details?.[31]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product2 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product2.product_specification_details?.[31]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                      {product3 && (
                        <aside
                          id="322269"
                          className="hasprod productid-322269  "
                        >
                          <p className="prop prop143794 " data-compare="200">
                            {
                              product3.product_specification_details?.[31]
                                ?.value
                            }
                          </p>
                        </aside>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="box-detailcp clickbuy">
            <aside></aside>
            {products &&
              products.map((item) => {
                return (
                  <>
                    <aside className="productid-322269">
                      <a href="#" onClick={() => handleAddToCart(item)}>
                        Mua ngay
                      </a>
                    </aside>
                  </>
                );
              })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
