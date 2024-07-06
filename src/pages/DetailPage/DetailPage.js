import { useParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import ProductDetail from "../../components/layout/ProductDetail";
import { useEffect, useState } from "react";
import "../DetailPage/DetailPage.css";
import api from "../../api/api";
import LoadingPage from "../../components/common/LoadingPage";

export default function DetailPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const getProductBySlug = async () => {
      try {
        const response = await api.get(`/laptop/${slug}`);
        setProduct(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProductBySlug();
  }, [slug]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>;
  }

  return (
    <>
      <Header />
      {product ? (
        <ProductDetail productDetail={product} />
      ) : (
        <div>Không có dữ liệu</div>
      )}
      <Footer />
    </>
  );
}
