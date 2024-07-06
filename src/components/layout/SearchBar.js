import { useEffect, useState } from "react";
import useDebounce from "../../hooks/debounce";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Searchbar() {
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState();
  const [searchValue, setSearchValue] = useState([]);
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 2000);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      api
        .get(`/laptop/search?search=${debouncedSearch}`)
        .then((res) => setSearchValue(res.data.data))
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  }, [debouncedSearch]);

  const reloadPage = (slug) => {
    navigate(`/laptop/${slug}`);
    window.location.reload(false);
  };

  return (
    <form action="#" className="hm-searchbox">
      <select className="nice-select select-search-category">
        <option value="0"> Danh mục sản phẩm</option>
        <option>Gaming</option>
        <option>Học tập, văn phòng</option>
        <option>Đồ họa, kỹ thuật</option>
        <option>Mỏng nhẹ</option>
        <option>AI</option>
        <option>Cao cấp, sang trọng</option>
      </select>
      <input type="text" placeholder="Bạn cần tìm gì?"  onChange={(e) => setSearch(e.target.value)}/>
      {search &&
        searchValue?.map((item) => (
          <div className="row">
            <div className="col-md-3">
              <img
                src={`http://localhost:8000/` + item?.images[0]?.url}
                style={{ width: "70px", height: "60px" }}
              />
            </div>
            <div className="col-md-8">
              <NavLink onClick={() => reloadPage(item.id)}>
                <h6 style={{ textAlign: "left" }}>{item.name}</h6>
              </NavLink>
            </div>
          </div>
        ))}
      <button className="li-btn" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}
