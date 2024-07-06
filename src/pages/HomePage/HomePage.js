import Footer from "../../components/layout/Footer";
import Banner from "../../components/layout/Banner";
import BestSeller from "../../components/layout/BestSeller";
import Header from "../../components/layout/Header/Header";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuthContext from "../../context/AuthContext";
import FlashSale from '../../components/product/FlashSale'
import '../HomePage/HomePage.css';

export default function HomePage() {
  // const location = useLocation();
  // const {callback} = useAuthContext();

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   const token = query.get('token');

  //   if (token) {
  //     callback("google");
  //     window.location.href = '/';
  //   }

  // }, [location, callback]);
  return (
    <>
      <ToastContainer/>
      <Header />
      <Banner />
      <FlashSale/>
      <BestSeller />
      <Footer />
    </>
  );
}
