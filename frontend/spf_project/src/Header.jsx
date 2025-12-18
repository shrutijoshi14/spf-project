import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function Header(){

 return(
<>
<nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          {/* Logo */}
            
        <img
      className="logo-circle-header"
      src="src\assets\WhatsApp Image 2025-09-17 at 3.09.47 PM.png"
      alt="Logo"
    />

          {/* Brand Name */}
          <h1 className="brand-title">SNP Finance</h1>
        </a>
      </div>
    </nav>
</>
    )
}
export default Header;