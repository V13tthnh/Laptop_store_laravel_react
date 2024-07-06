import "../../pages/OrderPage/OrderDetailPage.css";
import OrderDetail from "../../components/customer/OrderDetail";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";

export default function OrderDetailPage(){
    return(<>
        <Header/>
        <OrderDetail/>
        <Footer/>
    </>);
}