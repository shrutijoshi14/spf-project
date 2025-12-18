import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



function OverDue() {
    return (
        <>
            <Button variant="success" className="me-2 overdue-btn" >
                Over Due
            </Button>

        </>
    )

}
export default OverDue;