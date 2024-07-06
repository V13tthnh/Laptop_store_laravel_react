export default function NotFoundFilter() {
  return (
    <>
      <div
        className="att-no-products-found css-nq2gc4"
        style={{ textAlign: "center", marginLeft: '30px' }}
      >
        <div style={{ height: "400", width: "400" }} className="css-1tg24kl">
          <img
            src="/assets/images/filter/notfound.png"
            loading="lazy"
            hover=""
            decoding="async"
            alt=""
            fetchpriority="low"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "contain",
              position: "absolute",
              top: "0px",
              left: "0px",
            }}
          />
        </div>
        <div type="subtitle" className="css-1fuf6mn">
          Không tìm thấy sản phẩm nào
        </div>
      </div>
    </>
  );
}
