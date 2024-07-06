import Technical from "../product/Technical";

const BASE_URL = "http://127.0.0.1:8000/";
export default function FilterItem({ data }) {
  console.log(data.images[0]?.url);
  return (
    <>
      <div className="proloop" id="viewed-loop-1">
        <div className="proloop-block">
          <div className="proloop-img">
            <a
              className="aspect-ratio fade-box"
              href="/products/laptop-asus-vivobook-16-m1605ya-mb303w"
              title="Laptop ASUS Vivobook 16 M1605YA MB303W"
              aria-label="Laptop ASUS Vivobook 16 M1605YA MB303W"
            >
              <picture className="has-hover">
                <source
                  srcset={`${BASE_URL}${data.images[0]?.url}`}
                  data-srcset={`${BASE_URL}${data.images[0]?.url}`}
                  media="(max-width: 767px)"
                />
                <img
                  className="img-default ls-is-cached lazyloaded"
                  src={`${BASE_URL}${data.images[0]?.url}`}
                  data-src={`${BASE_URL}${data.images[0]?.url}`}
                  alt=" Laptop ASUS Vivobook 16 M1605YA MB303W "
                />
              </picture>
            </a>
            <div className="proloop-button" data-view="">
              <button
                aria-label="Xem nhanh"
                className="proloop-action quick-view"
                data-handle="/products/laptop-asus-vivobook-16-m1605ya-mb303w"
                data-id="1050784949"
              >
                Xem nhanh
              </button>
              <button
                aria-label="Thêm vào giỏ"
                className="proloop-action add-to-cart "
                data-id="1050784949"
                data-variantid="1114123868"
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
          <div className="proloop-detail">
            <h3 className="proloop-name">
              <a
                href="/products/laptop-asus-vivobook-16-m1605ya-mb303w"
                title="Laptop ASUS Vivobook 16 M1605YA MB303W"
              >
                {data.name}
              </a>
            </h3>
            <Technical technical={data?.product_specification_details} />
            <div className="proloop-price">
              {data.sale_price ? (
                <>
                  <div className="proloop-price--compare">
                    <del>{data.unit_price}</del>
                  </div>
                  <div className="proloop-price--default">
                    <span className="proloop-price--highlight">
                      {data.sale_price}
                    </span>
                    <span className="proloop-label--on-sale">-24%</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="proloop-price--default">
                    <span className="proloop-price--highlight">
                      {data.unit_price}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
