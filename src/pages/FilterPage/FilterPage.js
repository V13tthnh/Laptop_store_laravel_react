import { useEffect, useState } from "react";
import NotFoundFilter from "../../components/filter/NotFoundFilter";
import RelatedProductFilter from "../../components/filter/RelatedProductFilter";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import SearchFilter from "../../components/filter/SearchFilter";
import LeftSidebarFilter from "../../components/filter/leftSidebarFilter";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../FilterPage/FilterPage.css";
import { getAllProducts } from "../../api/product";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingPage from "../../components/common/LoadingPage";
import api from "../../api/api";
import FilterItem from "../../components/filter/filterItem";

export default function FilterPage() {
  const [products, setProducts] = useState();
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    price_min: "",
    price_max: "",
    brand: "",
    specifications: {
      ram: "",
      cpu: "",
      hardware: "",
      screen: "",
    },
    sort: "",
  });

  useEffect(() => {
    api
      .get("/laptop")
      .then((res) => {
        setLoading(true);
        if (res.data.status) {
          setProducts(res.data.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('http://localhost:8000/api/products', {
          params: filters
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSpecificationChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      specifications: {
        ...filters.specifications,
        [name]: value
      }
    });
  };

  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sort: e.target.value
    });
  };

  return (
    <>
      <Header />
      <div class="breadcrumb-area">
        <div class="container">
          <div class="breadcrumb-content">
            <ul>
              <li>
                <NavLink to="/">
                  <FontAwesomeIcon icon={faHome} size="lg" /> Trang chủ
                </NavLink>
              </li>
              <li>
                Laptop gaming | Laptop chơi game cấu hình mạnh, chính hãng
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-wraper pt-20 pb-60 pt-sm-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-2">
              <RelatedProductFilter total={products?.length} />
              <div className="shop-products-wrapper">
                <SearchFilter />
                {products?.length > 0 ? (
                  <div className="viewedlist-account">
                    {products ? (
                      products.map((item) => {
                        return <FilterItem data={item} />;
                      })
                    ) : (
                      <LoadingPage />
                    )}
                  </div>
                ) : (
                  <NotFoundFilter />
                )}
              </div>
            </div>
            <div className="col-lg-3 order-2 order-lg-1">
              <LeftSidebarFilter />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
