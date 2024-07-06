import React, { createContext, useContext, useState, useEffect } from "react";
import { getProductBySlug, getProducts } from "../services/ProductService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductDetail = async (slug) => {
    try {
      setLoading(true);
      const data = await getProductBySlug(slug);
      setProduct(data);
    } catch (error) {
      setError(error);
      console.error("Có lỗi xảy ra:", error);
      throw error;
    }finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ products, product, loading, error, getProductDetail }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
