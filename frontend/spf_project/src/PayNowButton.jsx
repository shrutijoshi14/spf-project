import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PayNowButton({ onClick }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Pay Now
    </button>
  );
}

export default PayNowButton;
