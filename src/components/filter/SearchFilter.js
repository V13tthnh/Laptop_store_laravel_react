import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function SearchFilter() {
  const [isSelect, setIsSale] = useState();

  return (
    <>
      <div className="css-v6thbz" direction="row">
        <div height="100%" direction="row" className="css-1k985bk">
          <div type="subtitle" className="css-1ew3940">
            Sắp xếp theo:
          </div>
          <div className="css-1w3mv8m" style={{padding: '0.5rem', marginRight: '1rem'}}>
            <div type="body" className="css-1lchwqw">
              Khuyến mãi
            </div>
          </div>
          <div className="css-1w3mv8m" style={{padding: '0.5rem', marginRight: '1rem'}}>
            <div type="body" className="css-1lchwqw">
              Giá tăng dần
            </div>
          </div>
          <div className="css-1w3mv8m" style={{padding: '0.5rem', marginRight: '1rem'}}>
            <div type="body" className="css-1lchwqw">
              Giá giảm dần
            </div>
          </div>
          <div className="css-1ss9yju" style={{padding: '0.5rem', marginRight: '1rem'}}>
            <div type="body" className="css-1lchwqw">
              Sản phẩm nổi bật 
            </div>
            <div className="css-u3jq8e"></div>
            <span className="css-mpv07g">
             <FontAwesomeIcon icon={faCheck}/>
            </span>
          </div>
          <div className="css-1w3mv8m" style={{padding: '0.5rem', marginRight: '1rem'}}>
            <div type="body" className="css-1lchwqw">
              Sản phẩm bán chạy
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
