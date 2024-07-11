import QuickLink from "./QuickLink";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getBanners } from "../../api/banner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Suspense } from "react";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Banner() {
  const [banners, setBanners] = useState();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await getBanners();
      setBanners(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <section className="slider" style={{ marginLeft: "320px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="slider-area">
                <div className="slider-active">
                    {banners && (
                      <Carousel
                        draggable={false}
                        showDots={false}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClassName="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={"desktop"}
                        itemClassName="carousel-item-padding-10-px"
                      >
                        {banners.map((item) => {
                          return (
                            <NavLink to={`/laptop/${item.link}`}>
                              <div className="single-slide align-center-left animation-style-01 bg-1">
                                <img
                                  src={`http://localhost:8000/${item.image_url}`}
                                  style={{ height: "500px", width: "100%" }}
                                  alt=""
                                />
                              </div>
                            </NavLink>
                          );
                        })}
                      </Carousel>
                    )}
                </div>
              </div>
            </div>
            {/* <div className="quick-link">
              <QuickLink />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
