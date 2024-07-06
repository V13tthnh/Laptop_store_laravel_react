import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function BreadCrumb({ categories, productName }) {
  return (
    <>
      <div class="breadcrumb-area">
        <div class="container">
          <div class="breadcrumb-content">
            <ul>
              <li>
                <NavLink to="/">
                  <FontAwesomeIcon icon={faHome} size="lg" /> Trang chủ
                </NavLink>
              </li>
              {categories && (
                <li>
                  <NavLink to={`/${categories.parent.slug}`}>
                    {categories.parent.name}
                  </NavLink>
                </li>
              )}
              {categories && (
                <li>
                  <NavLink to={`/${categories.parent.slug}/${categories.slug}`}>
                    {categories.name}
                  </NavLink>
                </li>
              )}
              {productName && <li>{productName}</li>}
             
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
