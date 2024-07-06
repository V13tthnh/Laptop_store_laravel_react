import "../../pages/AddressesPage/AddressesPage.css";
import Addresses from "../../components/customer/Addresses";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header/Header";

export default function AddressesPage() {
  return (
    <>
      <Header />
      <Addresses />
      <Footer />
    </>
  );
}
