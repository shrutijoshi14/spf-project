import React, { useState,useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function PaymentForm({ show, onClose, borrower }) {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  useEffect(() => {
    if (show) {
      setAmount(""); 
      setPaymentDate("");
    }
  }, [show, borrower]);

  if (!borrower) return null;


  if (!borrower) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Make Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Borrower Name</Form.Label>
            <Form.Control value={borrower.name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount to Pay</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success">Submit Payment</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentForm;
