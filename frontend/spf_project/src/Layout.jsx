// React from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import Header importfrom "./Header";
//  import { Outlet } from "react-router-dom";
// //  import Login from "./login";



// const Layout = () => {
//     return (
//         <div>
//             {/* <Login/> */}
//             <Header />
//             <Sidebar />
//             <div style={{ marginLeft: "170px", marginTop: "90px", padding: "20px" }}>
//                 <Outlet /> {/* This is where pages will load */}
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Layout;

// Layout.jsx
// import React from "react";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div style={{ display: "flex" }}>
//       {/* Sidebar fixed on left */}
//       <Sidebar />

//       {/* Main content area */}
//       <div style={{ marginLeft: "160px", padding: "20px", flex: 1 }}>
//         <Outlet /> 
//       </div>
//     </div>
//   );
// };

// export default Layout;

 

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { left } from "@popperjs/core";

const Layout = () => {
  return (
    <div>
     <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <Header />
      </div>
      <div style={{display:"flex", minHeight: "calc(100vh - 120px)"}}>
        {/* Sidebar */}
        <Sidebar />

        {/* Right-side content */}
        <div className="outlet" >    
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;






