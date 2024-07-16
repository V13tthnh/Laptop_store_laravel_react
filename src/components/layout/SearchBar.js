import { useEffect, useState } from "react";
import useDebounce from "../../hooks/debounce";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { showFailedAlert } from "../../utils/toastify";

export default function Searchbar() {
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState();
  const [searchValue, setSearchValue] = useState([]);
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      api
        .get(`/laptop/search/${debouncedSearch}`)
        .then((res) => setSearchValue(res.data.data))
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  }, [debouncedSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search){
      showFailedAlert("Vui lòng nhập dữ liệu tìm kiếm.");
      return;
    }
    navigate(`/laptop?search=${search}`);
  };

  return (
    <>
     <div className="search-container">
      <form action="#" className="hm-searchbox" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="li-btn" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      {/* <ProductDropdown products={searchValue} show={search ? true : false} /> */}
    </div>
    </>
  );
}
