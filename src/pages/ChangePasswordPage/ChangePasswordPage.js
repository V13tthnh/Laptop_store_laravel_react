
import "../../pages/ChangePasswordPage/ChangePasswordPage.css";
import ChangePassword from "../../components/customer/ChangePassword";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";

export default function ChangePasswordPage(){
    return(<>
        <Header/>
        <ChangePassword/>
        <Footer/>
    </>);
}