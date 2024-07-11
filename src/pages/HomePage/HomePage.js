import Footer from "../../components/layout/Footer";
import Banner from "../../components/layout/Banner";
import BestSeller from "../../components/layout/BestSeller";
import Header from "../../components/layout/Header/Header";
import { ToastContainer } from "react-toastify";
import useAuthContext from "../../context/AuthContext";
import FlashSale from '../../components/product/FlashSale'
import '../HomePage/HomePage.css';
import ViewedProduct from "../../components/product/ViewedProduct";
import FeaturedProduct from "../../components/product/FeaturedProduct";
import BasicSpeedDial from "../../components/common/SpeedDial";

export default function HomePage() {
  return (
    <>
      <ToastContainer/>
      <Header />
      <Banner />
      <BestSeller />
      <FeaturedProduct/>
      <ViewedProduct/>
      <Footer />
    </>
  );
}
