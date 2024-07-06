import hp from "../../assets/images/brands/logo-hp-149x40-1.jpg";
import asus from "../../assets/images/brands/logo-asus-149x40.jpg";
import acer from "../../assets/images/brands/logo-acer-149x40.jpg";
import lenovo from "../../assets/images/brands/logo-lenovo-149x40.jpg";
import dell from "../../assets/images/brands/logo-hp-149x40-1.jpg";
import msi from "../../assets/images/brands/logo-msi-149x40.jpg";
import masstel from "../../assets/images/brands/Masstel42-b0-200x48-1.jpg";
import macbook from "../../assets/images/brands/logo-macbook-149x40.jpg";

export default function QuickLink() {
  return (
    <>
      <div className="col-md-12 col-lg-12 col-sm-12">
        <a
          href=""
          data-href="laptop-hp-compaq"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={hp}
            height="25"
            className="no-text"
          />
        </a>
        <a
          href=""
          data-href="laptop-asus"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={asus}
            height="25"
            className="no-text"
          />
        </a>
        <a
          href=""
          data-href="laptop-acer"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={acer}
            height="25"
            className="no-text"
          />
        </a>
        <a
          href=""
          data-href="laptop-lenovo"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={lenovo}
            height="25"
            className="no-text"
          />
        </a>
        <a
          href=""
          data-href="laptop-dell"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={dell}
            height="25"
            className="no-text"
          />
        </a>
        <a
          href=""
          data-href="laptop-msi"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={msi}
            height="25"
            className="no-text"
          />
        </a>
        <a
          href=""
          data-href="laptop-apple-macbook"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={macbook}
            height="25"
            className="no-text"
          />
        </a>
        <a
          href=""
          data-href="laptop-masstel"
          data-index="0"
          className="box-quicklink__item bd-radius quicklink-logo"
        >
          <img
            src={masstel}
            height="25"
            className="no-text"
          />
        </a>
      </div>
    </>
  );
}
