import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Compare from "../common/Compare";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Review from "./Review";
import RelatedProduct from "../product/RelatedProduct";
import QuantitySelector from "../product/ProductDetail.js/QuantitySelector";
import BreadCrumb from "../common/BreadCrumb";
import { addToCart } from "../../redux/slices/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import { addToWishList } from "../../redux/slices/WishListSlice";
import { clearViewed } from "../../redux/slices/ViewedSlice";

export default function ProductDetail(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [slideIndex, setSlideIndex] = useState(1);
  const dispatch = useDispatch();

  const [width, setWidth] = useState(0);
  const [start, setStart] = useState(0);
  const [change, setChange] = useState(9);

  const slideRef = useRef();
  const [quantity, setQuantity] = useState(1);

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

  //Thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: `http://localhost:8000/${product.images[0]?.url}`,
        product_specification_detail: props.productDetail?.product_specification_details,
        quantity: quantity,
        unit_price: product.unit_price,
        sale_price: product.sale_price,
        availableQuantity: product.quantity,
      })
    );
    successNotify(`Đã thêm ${quantity} sản phẩm vào giỏ hàng.`);
  };

  const handleAddToWishlist = (product) => {
    dispatch(
      addToWishList({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: `http://localhost:8000/${product.images[0]?.url}`,
        quantity: quantity,
        unit_price: product.unit_price,
        sale_price: product.sale_price,
        availableQuantity: product.quantity,
      })
    );
    successNotify(`Đã thêm vào danh sách yêu thích`);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < props.productDetail?.quantity
        ? prevQuantity + 1
        : prevQuantity
    );
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  //Xử lý hình ảnh sản phẩm
  useEffect(() => {
    if (!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth;
    const childrenElementCount = slideRef.current.childElementCount;
    const width = scrollWidth / childrenElementCount;
    setWidth(width);
  }, []);

  useEffect(() => {
    if (!slideRef.current || !width) return;
    let numOfThumb = Math.round(slideRef.current.offsetWidth / width);
    slideRef.current.scrollLeft =
      slideIndex > numOfThumb ? (slideIndex - 1) * width : 0;
  }, [width, slideIndex]);

  const plusSlides = (n) => {
    setSlideIndex((prev) => prev + n);
    slideShow(slideIndex + n);
  };

  function slideShow(n) {
    if (n > props.productDetail?.images?.length) {
      setSlideIndex(1);
    }
    if (n < 0) {
      setSlideIndex(props.productDetail?.images?.length);
    }
  }

  function dragStart(e) {
    setStart(e.clientX);
  }

  function dragOver(e) {
    let touch = e.clientX;
    setChange(start - touch);
  }

  function dragEnd(e) {
    if (change > 0) {
      slideRef.current.scrollLeft += width;
    } else {
      slideRef.current.scrollLeft -= width;
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  //Tùy chỉnh hiển thị mô tả sản phẩm
  const editorConfiguration = {
    toolbar: [],
    readOnly: true,
  };

  return (
    <>
      <BreadCrumb
        categories={props.productDetail?.category}
        productName={props.productDetail?.name}
      />
      <div className="content-wrapper">
        <div className="container">
          <div className="row single-product-area">
            <div className="col-lg-5 col-md-6">
              <div className="product-details-left">
                {/* HIỂN THỊ HÌNH ẢNH */}
                <div className="product-details-images slider-navigation-1 product-detail1">
                  <div className="lg-image product-page-img1">
                    {props.productDetail?.images?.map((image, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="my-slides"
                            style={{
                              display:
                                index + 1 === slideIndex ? "block" : "none",
                            }}
                          >
                            <div className="number-image">
                              {index + 1}/{props.productDetail?.images?.length}
                            </div>
                            <img
                              src={`http://localhost:8000/${image.url}`}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                        </>
                      );
                    })}

                    <a
                      href="#"
                      className="prev-btn"
                      onClick={() => plusSlides(-1)}
                    >
                      &#10094;
                    </a>

                    <a
                      href="#"
                      className="next-btn"
                      onClick={() => plusSlides(1)}
                    >
                      &#10095;
                    </a>
                    <div
                      className="slider-img"
                      draggable={true}
                      ref={slideRef}
                      onDragStart={dragStart}
                      onDragOver={dragOver}
                      onDragEnd={dragEnd}
                    >
                      {props.productDetail?.images?.map((image, index) => {
                        return (
                          <div
                            className={`sm-image slider-box ${
                              index + 1 === slideIndex && "active"
                            }`}
                            onClick={() => setSlideIndex(index + 1)}
                          >
                            <img
                              src={`http://localhost:8000/${image.url}`}
                              alt="product image thumb"
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* CẤU HÌNH LAPTOP */}
                <p className="parameter__title">
                  Cấu hình {props.productDetail?.name}
                </p>
                <div className="parameter">
                  <ul className="parameter__list 313333 active">
                    <li data-index="0" data-prop="0">
                      <p className="lileft">CPU:</p>
                      <div className="liright">
                        {
                          props.productDetail?.product_specification_details[0]
                            ?.value
                        }
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">RAM:</p>
                      <div className="liright">
                        <span className="comma">
                          {
                            props.productDetail
                              ?.product_specification_details[6]?.value
                          }
                        </span>
                        <span className="comma">
                          {
                            props.productDetail
                              ?.product_specification_details[7]?.value
                          }
                        </span>
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Ổ cứng:</p>
                      <div className="liright">
                        <span className="">
                          {
                            props.productDetail
                              ?.product_specification_details[10]?.value
                          }
                        </span>
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Màn hình:</p>
                      <div className="liright">
                        <span className="comma">
                          {
                            props.productDetail
                              ?.product_specification_details[11]?.value
                          }
                        </span>
                        <span className="">
                          ,
                          {
                            props.productDetail
                              ?.product_specification_details[12]?.value
                          }
                        </span>
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Card màn hình:</p>
                      <div className="liright">
                        <span className="comma">
                          {
                            props.productDetail
                              ?.product_specification_details[15]?.value
                          }
                        </span>
                        <span className="">
                          {
                            props.productDetail
                              ?.product_specification_details[16]?.value
                          }
                        </span>
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Cổng kết nối:</p>
                      <div className="liright">
                        <span className="comma">
                          {
                            props.productDetail
                              ?.product_specification_details[18]?.value
                          }
                        </span>{" "}
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Hệ điều hành:</p>
                      <div className="liright">
                        <span className="">
                          {
                            props.productDetail
                              ?.product_specification_details[28]?.value
                          }
                        </span>
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Thiết kế:</p>
                      <div className="liright">
                        <span className="">
                          {
                            props.productDetail
                              ?.product_specification_details[25]?.value
                          }
                        </span>
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Kích thước, khối lượng:</p>
                      <div className="liright">
                        <span className="">
                          {
                            props.productDetail
                              ?.product_specification_details[24]?.value
                          }
                        </span>
                      </div>
                    </li>
                    <li data-index="0" data-prop="0">
                      <p className="lileft">Thời điểm ra mắt:</p>
                      <div className="liright">
                        <span className="">
                          {
                            props.productDetail
                              ?.product_specification_details[31]?.value
                          }
                        </span>
                      </div>
                    </li>
                  </ul>
                  <Modal
                    data={props.productDetail.product_specification_details}
                  />
                </div>
              </div>
            </div>
            {/* THÔNG TIN CHI TIẾT */}
            <div className="col-lg-7 col-md-6">
              <div className="product-details-view-content pt-60">
                <div className="product-info">
                  <h1>{props.productDetail?.name}</h1>
                  <div className="rating-box pt-20 pb-10">
                    <div className="rating-box">
                      <span style={{ fontWeight: "500", color: "#FDD835" }}>
                        {props.productDetail?.overrate}{" "}
                      </span>
                      <FontAwesomeIcon icon={faStar} color="#FDD835" />
                      <small style={{ color: "#6D6E72" }}>(0 đánh giá)</small>
                      <span className="review-item">
                        <a style={{ color: "#007bff" }} href="#">
                          Đánh giá
                        </a>
                      </span>
                    </div>
                  </div>
                  <Compare />
                  <div className="price-box pt-20">
                    <span className="new-price new-price-2">
                      {props.productDetail?.sale_price
                        ? props.productDetail?.sale_price
                        : props.productDetail?.unit_price}
                    </span>

                    {props.productDetail?.sale_price ? (
                      <span className="old-price">
                        {props.productDetail?.unit_price}
                      </span>
                    ) : (
                      ""
                    )}

                    {props.productDetail?.sale_price ? (
                      <span className="discount-percentage">17%</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="commitment-box">
                    <p>
                      <FontAwesomeIcon icon={faCheck} color="green" /> Bảo hành
                      chính hãng 12 tháng.
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faCheck} color="green" /> Hỗ trợ
                      đổi mới trong 7 ngày.
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faCheck} color="green" /> Miễn phí
                      giao hàng toàn quốc.
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faCheck} color="green" /> Windows
                      bản quyền tích hợp.
                    </p>
                  </div>
                  {props.productDetail?.quantity > 0 ? (
                    <>
                      <div className="single-add-to-cart">
                        <div className="cart-quantity">
                          <QuantitySelector
                            quantity={quantity}
                            onIncrease={increaseQuantity}
                            onDecrease={decreaseQuantity}
                            onChange={handleQuantityChange}
                          />
                          <button
                            className="add-to-cart"
                            onClick={() => handleAddToCart(props.productDetail)}
                          >
                            Mua Ngay
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="cart-quantity">
                        <p style={{ fontSize: "28px", color: "red" }}>
                          Đã hết hàng
                        </p>
                      </div>
                    </>
                  )}

                  <div className="product-additional-info pt-25 pb-25">
                    <a
                      className="wishlist-btn"
                      href="#"
                      onClick={() => handleAddToWishlist(props.productDetail)}
                    >
                      <i className="fa fa-heart-o"></i>Thêm vào danh sách yêu
                      thích
                    </a>
                  </div>
                  {isExpanded ? (
                    <div className="product-desc">
                      <p>
                        <h3 style={{ color: "#111111" }}>
                          <span>
                            Đánh giá chi tiết Laptop {props.productDetail?.name}
                          </span>
                        </h3>
                        <CKEditor
                          editor={ClassicEditor}
                          data={props.productDetail?.description}
                          config={editorConfiguration}
                          disabled
                        />
                        {/* <span dangerouslySetInnerHTML={{ __html: props.productDetail?.description }} ></span> */}
                      </p>
                      <div className="desc-btn">
                        <button
                          className="expandable-btn button"
                          onClick={toggleExpand}
                        >
                          {isExpanded ? (
                            <>
                              <span className="expandable-toggle--text less">
                                Thu gọn bài viết
                              </span>
                              <span className="expandable-toggle--icon ml-1">
                                <FontAwesomeIcon icon={faChevronUp} size="sm" />
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="expandable-toggle--text more">
                                Đọc bài viết
                              </span>
                              <span className="expandable-toggle--icon ml-1">
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  size="sm"
                                />
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="product-desc">
                      <p>
                        <h3 style={{ color: "#111111" }}>
                          <span>
                            Đánh giá chi tiết {props.productDetail?.name}
                          </span>
                        </h3>
                      </p>
                      <div className="desc-btn">
                        <button
                          className="expandable-btn button"
                          onClick={toggleExpand}
                        >
                          {isExpanded ? (
                            <>
                              <span className="expandable-toggle--text less">
                                Thu gọn bài viết
                              </span>
                              <span className="expandable-toggle--icon ml-1">
                                <FontAwesomeIcon icon={faChevronUp} size="sm" />
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="expandable-toggle--text more">
                                Đọc bài viết
                              </span>
                              <span className="expandable-toggle--icon ml-1">
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  size="sm"
                                />
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <Review data={props.productDetail} />
      </div>

      <div className="content-wrapper">
        <RelatedProduct product_id={props.productDetail.id} />
      </div>
    </>
  );
}
