// 
import React from "react";
import { Button } from "react-bootstrap";

function ActiveButton({ onActive }) {
  return (
    <>
      <Button 
        variant="success" 
        className="me-2 active-loanbtn"
        onClick={onActive}
      >
        Active
      </Button>
    </>
  );
}

export default ActiveButton;
