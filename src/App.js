import "./App.css";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage/DetailPage";
import HomePage from "./pages/HomePage/HomePage";
import AccountPage from "./pages/AccountPage/AccountPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import AddressesPage from "./pages/AddressesPage/AddressesPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import OrderDetailPage from "./pages/OrderPage/OrderDetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import EmailVerification from "./components/email/EmailVerification";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleCallback from "./pages/LoginPage/GoogleCallback";
import FilterPage from "./pages/FilterPage/FilterPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/laptop/:slug" element={<DetailPage />}></Route> 
        <Route path="/account/profile" element={<AccountPage/>}></Route> 
        <Route path="/account/addresses" element={<AddressesPage/>}></Route> 
        <Route path="/account/orders" element={<OrderPage/>}></Route> 
        <Route path="/account/wishlist" element={<WishlistPage/>}></Route> 
        <Route path="/account/change-password" element={<ChangePasswordPage/>}></Route> 
        <Route path="/account/order/detail" element={<OrderDetailPage/>}></Route> 
        <Route path="/cart" element={<CartPage/>}></Route> 
        <Route path="/cart/checkout" element={<CheckoutPage/>}></Route> 

        <Route path="/laptop" element={<FilterPage/>}></Route>
        <Route path="/review" element={<ReviewPage/>}></Route> 
        <Route path="/login" element={<LoginPage/>}></Route> 
        <Route path="auth/callback/google" element={<GoogleCallback />}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route> 
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}></Route>
        <Route path="/reset-password/:token" element={<ResetPasswordPage/>}></Route>
        <Route path="/email/verify/:id/:hash" element={<EmailVerification/>}></Route>


        <Route path="/about" element={<AboutPage/>}></Route>
      </Routes>
      
    </>
  );
}

export default App;
