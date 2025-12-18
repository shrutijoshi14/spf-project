import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



function InactiveButton({onInactive}) {
    return (
        <>
            <Button 
            variant="danger"
             className="me-2 inactive-loanbtn"
             onClick={onInactive}
             >
                Inactive
            </Button>

        </>
    )

}
export default InactiveButton;