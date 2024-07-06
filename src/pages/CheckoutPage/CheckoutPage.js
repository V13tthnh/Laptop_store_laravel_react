import "../../pages/CheckoutPage/CheckoutPage.css";
import Checkout from "../../components/checkout/Checkout";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";
import "../CheckoutPage/CheckoutPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    navigate("/");
  }

  return (
    <>
      <Header />
      <Checkout carts={cartItems} />
      <Footer />
    </>
  );
}
