import "../../pages/CheckoutPage/CheckoutPage.css";
import Checkout from "../../components/checkout/Checkout";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../CheckoutPage/CheckoutPage.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <ToastContainer />
      <Header />
      <Checkout carts={cartItems} />
      <Footer />
    </>
  );
}
