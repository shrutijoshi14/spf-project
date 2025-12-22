// import React from "react";
// import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";



// function DownloadButton() {
//   return (
//     <>
//       <Button variant="success download-btn"
//         // onClick={onDownload}
//       >
//         <i className=" bi bi-download" ></i> Download
//       </Button>

//     </>
//   )

// }
// export default DownloadButton;


import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function DownloadButton() {
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/borrowers/export", {
        responseType: "blob", 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "borrowers_report.csv");
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download Error:", error);
      alert("डाऊनलोड अयशस्वी! बॅकएंड तपासा.");
    }
  };

  return (
    <Button variant="success" className="download-btn" onClick={handleDownload}>
      <i className="bi bi-download"></i> Download CSV
    </Button>
  );
}

export default DownloadButton;