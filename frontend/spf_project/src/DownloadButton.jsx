import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



function DownloadButton() {
  return (
    <>
      <Button variant="success download-btn"
        // onClick={onDownload}
      >
        <i className=" bi bi-download" ></i> Download
      </Button>

    </>
  )

}
export default DownloadButton;