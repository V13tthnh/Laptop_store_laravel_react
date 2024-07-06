import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Compare() {
  return (
    <>
      <a href="" >
        <FontAwesomeIcon icon={faCirclePlus} color="#2f80ed" size="lg" />
        <small style={{ color: "#2f80ed", padding: "3px" }}>So sánh</small>
      </a>
    </>
  );
}
