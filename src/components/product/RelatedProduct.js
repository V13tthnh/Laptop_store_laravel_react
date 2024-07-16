import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SingleProduct from "../layout/SingleProduct";
import { useEffect, useState } from "react";
import { getRelatedProducts } from "../../api/product";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function RelatedProduct({ product_id }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  const fetchRelatedProducts = async () => {
    try {
      const response = await getRelatedProducts({ product_id: product_id });
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section
        className="best-seller container"
        style={{
          background: "#fff",
          marginTop: "40px",
          marginBottom: "40px",
          borderRadius: "10px",
        }}
      >
        <div className="product-area pt-60 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="li-product-tab" style={{ marginLeft: "17px" }}>
                  <span>
                    <h4>Sản phẩm liên quan</h4>
                  </span>
                </div>
              </div>
            </div>
            <div className="tab-content" style={{ marginLeft: "15px" }}>
              <div
                id="li-new-product"
                className="tab-pane active show"
                role="tabpanel"
              >
                <div className="row">
                  <div className="product-active">
                    <section
                      className="bestseller"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="container">
                        {products && (
                          <>
                            <Carousel
                              autoPlay={true}
                              draggable={false}
                              showDots={false}
                              responsive={responsive}
                              ssr={true}
                              infinite={true}
                              autoPlaySpeed={2000}
                              keyBoardControl={true}
                              customTransition="all .5"
                              transitionDuration={500}
                              containerClass="carousel-container"
                              removeArrowOnDeviceType={["tablet", "mobile"]}
                              deviceType={"desktop"}
                              dotListClass="custom-dot-list-style"
                              itemClass="carousel-item-padding-40-px"
                            >
                              {products.map((item) => {
                                return (
                                  <>
                                    <SingleProduct data={item} />
                                    <div
                                      id="li-bestseller-product"
                                      className="tab-pane"
                                      role="tabpanel"
                                    ></div>
                                  </>
                                );
                              })}
                            </Carousel>
                          </>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
