import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



function UploadButton() {
    return (
        <>
            <Button variant="primary" className="me-2 upload" >
                <i className="bi bi-upload"></i> Upload
            </Button>
        </>
    )

}
export default UploadButton;