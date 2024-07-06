export default function CardProductPrice({sale_price, unit_price}) {
  return (
    <>
      <div className="price-box">
        <span className="new-price new-price-2"><b>{unit_price}</b></span>
        {sale_price ? <span className="old-price">72.800.000đ</span> : ''}
      </div>
    </>
  );
}
