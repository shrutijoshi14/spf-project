import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

function Details({ borrower }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      {/* Details Button */}
      <Button variant="info" className="me-2" onClick={handleShow}>
        <i className="bi bi-eye"></i>
      </Button>

      {/* Details Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Borrower Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>Name:</strong> {borrower.name}</p>
          <p><strong>Mobile:</strong> {borrower.mobileNumber}</p>
          <p><strong>Loan Amount:</strong> ₹{borrower.loanAmount}</p>
          <p><strong>Interest Rate:</strong> {borrower.interestRate}%</p>
          <p><strong>Disbursement Date:</strong> {borrower.disbursementDate}</p>
          <p><strong>Out Standing amount:</strong> {borrower.outstanding}</p>
          <p><strong>Referred By:</strong> {borrower.loanReferredBy}</p>
          <p><strong>Penalty per day:</strong> {borrower.penalty}</p>
          

          <p><strong>Status:</strong> {borrower.status}</p>
        </Modal.Body>


      </Modal>
    </>
  );
}

export default Details;
